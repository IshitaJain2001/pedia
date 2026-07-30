import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { auth, signOut } from '../firebase';
import axios from 'axios';
import toast from 'react-hot-toast';
import { 
  FaSignOutAlt, FaCalendarCheck, FaQuestionCircle, FaClock, FaCheckCircle, 
  FaSearch, FaTrash, FaEye, FaChevronLeft, FaChevronRight, FaFilter, FaInbox,
  FaFileMedical, FaUser, FaPhone, FaEnvelope, FaBaby
} from 'react-icons/fa';

const AUTHORIZED_EMAILS = ['drabbas10@gmail.com', 'ishitajain385@gmail.com'];

const getApiUrl = () => {
  if (window.location.hostname === 'localhost') {
    return 'http://localhost:5000/api';
  }
  return 'https://pedia-backend-6blx.onrender.com/api';
};

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [adminEmail, setAdminEmail] = useState('');
  const [stats, setStats] = useState({
    totalQueries: 0,
    totalAppointments: 0,
    pendingAppointments: 0,
    confirmedAppointments: 0
  });
  const [queries, setQueries] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('appointments'); // 'appointments' or 'queries'
  
  // Search & Pagination states
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // Selected Detail Modal
  const [selectedRecord, setSelectedRecord] = useState(null);

  // Status Filter for Appointments
  const [statusFilter, setStatusFilter] = useState('All');

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    const email = localStorage.getItem('adminEmail');

    if (!token || !AUTHORIZED_EMAILS.includes(email)) {
      handleSignOut('Please log in to continue.');
      return;
    }

    setAdminEmail(email);
    fetchDashboardData(token);
  }, []);

  const handleSignOut = async (msg = 'Signed out successfully.') => {
    try {
      await signOut(auth);
    } catch (e) {
      console.error(e);
    }
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminEmail');
    if (msg) toast.success(msg);
    navigate('/admin/login');
  };

  const getHeaders = () => {
    const token = localStorage.getItem('adminToken');
    return {
      headers: {
        Authorization: `Bearer ${token}`
      }
    };
  };

  const fetchDashboardData = async (token) => {
    setLoading(true);
    const API_URL = getApiUrl();
    try {
      // 1. Fetch Stats
      const statsRes = await axios.get(`${API_URL}/admin/stats`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (statsRes.data.success) {
        setStats(statsRes.data.data);
      }

      // 2. Fetch Queries
      const queriesRes = await axios.get(`${API_URL}/general-query`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (queriesRes.data.success) {
        setQueries(queriesRes.data.data);
      }

      // 3. Fetch Appointments
      const appointmentsRes = await axios.get(`${API_URL}/appointments`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (appointmentsRes.data.success) {
        setAppointments(appointmentsRes.data.data);
      }
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      if (error.response?.status === 401 || error.response?.status === 403) {
        handleSignOut('Session expired or unauthorized.');
      } else {
        toast.error('Failed to load data. Please refresh.');
      }
    } finally {
      setLoading(false);
    }
  };

  // Delete general query
  const handleDeleteQuery = async (id) => {
    if (!window.confirm('Are you sure you want to delete this general query?')) return;
    const API_URL = getApiUrl();
    try {
      const res = await axios.delete(`${API_URL}/general-query/${id}`, getHeaders());
      if (res.data.success) {
        toast.success('Query deleted successfully.');
        setQueries(queries.filter(q => q._id !== id));
        setStats(prev => ({ ...prev, totalQueries: prev.totalQueries - 1 }));
      }
    } catch (error) {
      toast.error('Failed to delete query.');
    }
  };

  // Delete appointment
  const handleDeleteAppointment = async (id) => {
    if (!window.confirm('Are you sure you want to delete this appointment?')) return;
    const API_URL = getApiUrl();
    try {
      const res = await axios.delete(`${API_URL}/appointments/${id}`, getHeaders());
      if (res.data.success) {
        toast.success('Appointment deleted successfully.');
        const deletedAppt = appointments.find(a => a._id === id);
        setAppointments(appointments.filter(a => a._id !== id));
        
        // Recalculate stats
        setStats(prev => {
          let pending = prev.pendingAppointments;
          let confirmed = prev.confirmedAppointments;
          if (deletedAppt.status === 'Pending') pending--;
          if (deletedAppt.status === 'Confirmed') confirmed--;
          return {
            ...prev,
            totalAppointments: prev.totalAppointments - 1,
            pendingAppointments: Math.max(0, pending),
            confirmedAppointments: Math.max(0, confirmed)
          };
        });
      }
    } catch (error) {
      toast.error('Failed to delete appointment.');
    }
  };

  // Update appointment status
  const handleUpdateStatus = async (id, newStatus) => {
    const API_URL = getApiUrl();
    try {
      const res = await axios.patch(`${API_URL}/appointments/${id}`, { status: newStatus }, getHeaders());
      if (res.data.success) {
        toast.success(`Status updated to ${newStatus}`);
        
        // Update in state
        const oldAppt = appointments.find(a => a._id === id);
        setAppointments(appointments.map(a => a._id === id ? { ...a, status: newStatus } : a));

        // Update stats
        setStats(prev => {
          let pending = prev.pendingAppointments;
          let confirmed = prev.confirmedAppointments;
          
          if (oldAppt.status === 'Pending') pending--;
          if (oldAppt.status === 'Confirmed') confirmed--;
          
          if (newStatus === 'Pending') pending++;
          if (newStatus === 'Confirmed') confirmed++;
          
          return {
            ...prev,
            pendingAppointments: Math.max(0, pending),
            confirmedAppointments: Math.max(0, confirmed)
          };
        });
      }
    } catch (error) {
      toast.error('Failed to update status.');
    }
  };

  // Filter queries based on search
  const filteredQueries = queries.filter(q => 
    q.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    q.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    q.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
    q.message.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Filter appointments based on search & status filter
  const filteredAppointments = appointments.filter(a => {
    const matchesSearch = 
      a.parentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      a.childName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      a.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      a.phone.includes(searchTerm);
    
    const matchesStatus = statusFilter === 'All' || a.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  // Pagination helper
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  
  const currentQueries = filteredQueries.slice(indexOfFirstItem, indexOfLastItem);
  const currentAppointments = filteredAppointments.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = activeTab === 'appointments' 
    ? Math.ceil(filteredAppointments.length / itemsPerPage)
    : Math.ceil(filteredQueries.length / itemsPerPage);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  // Reset page when switching tabs
  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setSearchTerm('');
    setCurrentPage(1);
  };

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'Confirmed': return 'bg-emerald-50 text-emerald-700 border-emerald-100';
      case 'Pending':   return 'bg-amber-50 text-amber-700 border-amber-100';
      case 'Completed': return 'bg-primary-50 text-primary-700 border-primary-100';
      case 'Cancelled': return 'bg-rose-50 text-rose-700 border-rose-100';
      default:          return 'bg-neutral-50 text-neutral-700 border-neutral-100';
    }
  };

  return (
    <div className="min-h-screen bg-neutral-50 p-4 sm:p-6 lg:p-8 font-inter relative overflow-hidden text-neutral-800">
      
      {/* Orbs */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-primary-50 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary-50 rounded-full blur-3xl translate-x-1/2 translate-y-1/2 pointer-events-none" />

      {/* Header */}
      <div className="relative z-10 max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between bg-white border border-neutral-100 shadow-card rounded-3xl p-5 mb-6 sm:mb-8 gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-primary-50 text-primary-green rounded-2xl flex items-center justify-center font-bold text-lg">
            A
          </div>
          <div>
            <h1 className="text-xl font-poppins font-bold text-neutral-900">Al-Sageer Clinic</h1>
            <p className="text-xs text-neutral-400 font-medium">Administration Dashboard</p>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="text-right hidden sm:block">
            <p className="text-xs text-neutral-400">Authenticated Admin</p>
            <p className="text-sm font-semibold text-neutral-700">{adminEmail}</p>
          </div>
          <button
            onClick={() => handleSignOut()}
            className="flex items-center gap-2 px-4 py-2.5 bg-neutral-100 hover:bg-neutral-200 text-neutral-700 font-semibold text-sm rounded-xl transition-all"
          >
            <FaSignOutAlt className="text-xs" />
            <span>Sign Out</span>
          </button>
        </div>
      </div>

      {loading ? (
        <div className="max-w-7xl mx-auto flex flex-col items-center justify-center py-20 relative z-10">
          <svg className="w-12 h-12 animate-spin text-primary-green mb-4" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
          </svg>
          <p className="text-sm font-medium text-neutral-500 animate-pulse">Loading dashboard statistics and records…</p>
        </div>
      ) : (
        <div className="relative z-10 max-w-7xl mx-auto space-y-6 sm:space-y-8">
          
          {/* Stats Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Stat 1 */}
            <motion.div whileHover={{ y: -3 }} className="bg-white border border-neutral-100 shadow-card rounded-2xl p-5 flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold text-neutral-400 uppercase tracking-wider">Queries</p>
                <p className="text-2xl font-poppins font-bold text-neutral-900 mt-1">{stats.totalQueries}</p>
              </div>
              <div className="w-12 h-12 bg-primary-50 text-primary-green rounded-xl flex items-center justify-center">
                <FaQuestionCircle size={18} />
              </div>
            </motion.div>
            
            {/* Stat 2 */}
            <motion.div whileHover={{ y: -3 }} className="bg-white border border-neutral-100 shadow-card rounded-2xl p-5 flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold text-neutral-400 uppercase tracking-wider">Appointments</p>
                <p className="text-2xl font-poppins font-bold text-neutral-900 mt-1">{stats.totalAppointments}</p>
              </div>
              <div className="w-12 h-12 bg-primary-50 text-primary-green rounded-xl flex items-center justify-center">
                <FaCalendarCheck size={18} />
              </div>
            </motion.div>

            {/* Stat 3 */}
            <motion.div whileHover={{ y: -3 }} className="bg-white border border-neutral-100 shadow-card rounded-2xl p-5 flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold text-neutral-400 uppercase tracking-wider">Pending</p>
                <p className="text-2xl font-poppins font-bold text-amber-600 mt-1">{stats.pendingAppointments}</p>
              </div>
              <div className="w-12 h-12 bg-amber-50 text-amber-600 rounded-xl flex items-center justify-center">
                <FaClock size={18} />
              </div>
            </motion.div>

            {/* Stat 4 */}
            <motion.div whileHover={{ y: -3 }} className="bg-white border border-neutral-100 shadow-card rounded-2xl p-5 flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold text-neutral-400 uppercase tracking-wider">Confirmed</p>
                <p className="text-2xl font-poppins font-bold text-emerald-600 mt-1">{stats.confirmedAppointments}</p>
              </div>
              <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center">
                <FaCheckCircle size={18} />
              </div>
            </motion.div>
          </div>

          {/* Records Section */}
          <div className="bg-white border border-neutral-100 shadow-card rounded-3xl overflow-hidden">
            
            {/* Navigation Tabs & Search Controls */}
            <div className="border-b border-neutral-100 p-5 flex flex-col md:flex-row items-center justify-between gap-4 bg-white">
              
              {/* Tabs */}
              <div className="flex gap-1.5 p-1 bg-neutral-100 rounded-2xl w-full md:w-auto">
                <button
                  onClick={() => handleTabChange('appointments')}
                  className={`flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all w-full md:w-auto ${activeTab === 'appointments' ? 'bg-white text-primary-green shadow-sm' : 'text-neutral-500 hover:text-neutral-700'}`}
                >
                  <FaCalendarCheck size={14} />
                  <span>Appointments</span>
                </button>
                <button
                  onClick={() => handleTabChange('queries')}
                  className={`flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all w-full md:w-auto ${activeTab === 'queries' ? 'bg-white text-primary-green shadow-sm' : 'text-neutral-500 hover:text-neutral-700'}`}
                >
                  <FaQuestionCircle size={14} />
                  <span>General Queries</span>
                </button>
              </div>

              {/* Filters Bar */}
              <div className="flex items-center gap-3 w-full md:w-auto">
                
                {/* Appointment Status Dropdown Filter */}
                {activeTab === 'appointments' && (
                  <div className="relative flex items-center gap-2">
                    <FaFilter className="absolute left-3.5 text-neutral-400 text-xs" />
                    <select
                      value={statusFilter}
                      onChange={(e) => { setStatusFilter(e.target.value); setCurrentPage(1); }}
                      className="pl-9 pr-4 py-2.5 text-sm font-medium border border-neutral-200 rounded-xl outline-none focus:border-primary-green bg-white transition-all"
                    >
                      <option value="All">All Statuses</option>
                      <option value="Pending">Pending</option>
                      <option value="Confirmed">Confirmed</option>
                      <option value="Completed">Completed</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  </div>
                )}

                {/* Search Bar */}
                <div className="relative flex-grow md:w-64">
                  <FaSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400 text-sm" />
                  <input
                    type="text"
                    placeholder="Search records…"
                    value={searchTerm}
                    onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
                    className="w-full pl-10 pr-4 py-2.5 text-sm border border-neutral-200 rounded-xl outline-none focus:border-primary-green transition-all placeholder-neutral-400"
                  />
                </div>
              </div>

            </div>

            {/* Content Table Container */}
            <div className="overflow-x-auto">
              
              {/* Tab 1: Appointments Table */}
              {activeTab === 'appointments' && (
                <>
                  {currentAppointments.length > 0 ? (
                    <table className="w-full text-left border-collapse min-w-[1000px]">
                      <thead>
                        <tr className="bg-neutral-50/50 border-b border-neutral-100">
                          <th className="p-4 text-xs font-bold text-neutral-400 uppercase tracking-wider pl-6">Parent Name</th>
                          <th className="p-4 text-xs font-bold text-neutral-400 uppercase tracking-wider">Child Info</th>
                          <th className="p-4 text-xs font-bold text-neutral-400 uppercase tracking-wider">Phone / Email</th>
                          <th className="p-4 text-xs font-bold text-neutral-400 uppercase tracking-wider">Preferred Doctor</th>
                          <th className="p-4 text-xs font-bold text-neutral-400 uppercase tracking-wider">Schedule Time</th>
                          <th className="p-4 text-xs font-bold text-neutral-400 uppercase tracking-wider">Status</th>
                          <th className="p-4 text-xs font-bold text-neutral-400 uppercase tracking-wider text-right pr-6">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-neutral-100">
                        {currentAppointments.map((appt) => (
                          <tr key={appt._id} className="hover:bg-neutral-50/30 transition-colors">
                            <td className="p-4 pl-6 text-sm font-semibold text-neutral-800">{appt.parentName}</td>
                            <td className="p-4">
                              <p className="text-sm font-medium text-neutral-800">{appt.childName}</p>
                              <p className="text-xs text-neutral-400">Age: {appt.childAge} • {appt.gender}</p>
                            </td>
                            <td className="p-4">
                              <p className="text-sm text-neutral-800 font-medium">{appt.phone}</p>
                              <p className="text-xs text-neutral-400">{appt.email}</p>
                            </td>
                            <td className="p-4 text-sm font-medium text-neutral-600">{appt.doctor}</td>
                            <td className="p-4">
                              <p className="text-sm text-neutral-800 font-semibold">
                                {new Date(appt.appointmentDate).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })}
                              </p>
                              <p className="text-xs text-neutral-400">{appt.preferredTime}</p>
                            </td>
                            <td className="p-4">
                              <select
                                value={appt.status}
                                onChange={(e) => handleUpdateStatus(appt._id, e.target.value)}
                                className={`text-xs font-semibold border rounded-full px-2.5 py-1.5 outline-none font-inter shadow-sm cursor-pointer ${getStatusBadgeClass(appt.status)}`}
                              >
                                <option value="Pending">Pending</option>
                                <option value="Confirmed">Confirmed</option>
                                <option value="Completed">Completed</option>
                                <option value="Cancelled">Cancelled</option>
                              </select>
                            </td>
                            <td className="p-4 text-right pr-6">
                              <div className="flex items-center justify-end gap-2">
                                <button
                                  onClick={() => setSelectedRecord({ type: 'appointment', ...appt })}
                                  className="w-8 h-8 rounded-lg bg-primary-50 text-primary-green flex items-center justify-center hover:bg-primary-100 transition-colors"
                                  title="View Details"
                                >
                                  <FaEye size={12} />
                                </button>
                                <button
                                  onClick={() => handleDeleteAppointment(appt._id)}
                                  className="w-8 h-8 rounded-lg bg-rose-50 text-rose-600 flex items-center justify-center hover:bg-rose-100 transition-colors"
                                  title="Delete"
                                >
                                  <FaTrash size={12} />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  ) : (
                    <div className="flex flex-col items-center justify-center py-16 text-center">
                      <div className="w-14 h-14 bg-neutral-50 rounded-2xl flex items-center justify-center text-neutral-400 mb-4">
                        <FaInbox size={24} />
                      </div>
                      <h3 className="text-base font-semibold text-neutral-700">No Appointments Found</h3>
                      <p className="text-xs text-neutral-400 mt-1 max-w-sm">No appointment submissions match your filters or search query.</p>
                    </div>
                  )}
                </>
              )}

              {/* Tab 2: General Queries Table */}
              {activeTab === 'queries' && (
                <>
                  {currentQueries.length > 0 ? (
                    <table className="w-full text-left border-collapse min-w-[1000px]">
                      <thead>
                        <tr className="bg-neutral-50/50 border-b border-neutral-100">
                          <th className="p-4 text-xs font-bold text-neutral-400 uppercase tracking-wider pl-6">Name</th>
                          <th className="p-4 text-xs font-bold text-neutral-400 uppercase tracking-wider">Contact Info</th>
                          <th className="p-4 text-xs font-bold text-neutral-400 uppercase tracking-wider">Child Age</th>
                          <th className="p-4 text-xs font-bold text-neutral-400 uppercase tracking-wider">Subject</th>
                          <th className="p-4 text-xs font-bold text-neutral-400 uppercase tracking-wider">Submitted Date</th>
                          <th className="p-4 text-xs font-bold text-neutral-400 uppercase tracking-wider text-right pr-6">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-neutral-100">
                        {currentQueries.map((query) => (
                          <tr key={query._id} className="hover:bg-neutral-50/30 transition-colors">
                            <td className="p-4 pl-6 text-sm font-semibold text-neutral-800">{query.name}</td>
                            <td className="p-4">
                              <p className="text-sm font-medium text-neutral-800">{query.phone}</p>
                              <p className="text-xs text-neutral-400">{query.email}</p>
                            </td>
                            <td className="p-4 text-sm font-medium text-neutral-600">{query.childAge}</td>
                            <td className="p-4 text-sm font-medium text-neutral-800 max-w-[200px] truncate">{query.subject}</td>
                            <td className="p-4 text-sm font-medium text-neutral-500">
                              {new Date(query.createdAt).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                            </td>
                            <td className="p-4 text-right pr-6">
                              <div className="flex items-center justify-end gap-2">
                                <button
                                  onClick={() => setSelectedRecord({ type: 'query', ...query })}
                                  className="w-8 h-8 rounded-lg bg-primary-50 text-primary-green flex items-center justify-center hover:bg-primary-100 transition-colors"
                                  title="View Details"
                                >
                                  <FaEye size={12} />
                                </button>
                                <button
                                  onClick={() => handleDeleteQuery(query._id)}
                                  className="w-8 h-8 rounded-lg bg-rose-50 text-rose-600 flex items-center justify-center hover:bg-rose-100 transition-colors"
                                  title="Delete"
                                >
                                  <FaTrash size={12} />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  ) : (
                    <div className="flex flex-col items-center justify-center py-16 text-center">
                      <div className="w-14 h-14 bg-neutral-50 rounded-2xl flex items-center justify-center text-neutral-400 mb-4">
                        <FaInbox size={24} />
                      </div>
                      <h3 className="text-base font-semibold text-neutral-700">No Queries Found</h3>
                      <p className="text-xs text-neutral-400 mt-1 max-w-sm">No general queries submissions match your search query.</p>
                    </div>
                  )}
                </>
              )}

            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="border-t border-neutral-100 px-6 py-4 flex items-center justify-between bg-white">
                <span className="text-xs text-neutral-400">
                  Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, activeTab === 'appointments' ? filteredAppointments.length : filteredQueries.length)} of {activeTab === 'appointments' ? filteredAppointments.length : filteredQueries.length} records
                </span>
                
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="w-8 h-8 flex items-center justify-center border border-neutral-200 rounded-lg text-neutral-500 hover:bg-neutral-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                  >
                    <FaChevronLeft size={10} />
                  </button>
                  {[...Array(totalPages)].map((_, i) => (
                    <button
                      key={i}
                      onClick={() => handlePageChange(i + 1)}
                      className={`w-8 h-8 text-xs font-bold rounded-lg transition-all ${currentPage === i + 1 ? 'bg-primary-green text-white shadow-sm' : 'border border-neutral-200 text-neutral-600 hover:bg-neutral-50'}`}
                    >
                      {i + 1}
                    </button>
                  ))}
                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="w-8 h-8 flex items-center justify-center border border-neutral-200 rounded-lg text-neutral-500 hover:bg-neutral-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                  >
                    <FaChevronRight size={10} />
                  </button>
                </div>
              </div>
            )}

          </div>

        </div>
      )}

      {/* Record Details Modal overlay */}
      <AnimatePresence>
        {selectedRecord && (
          <div className="fixed inset-0 bg-neutral-900/40 backdrop-blur-xs flex items-center justify-center p-4 z-50 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-3xl shadow-card-lg border border-neutral-100 w-full max-w-lg overflow-hidden relative"
            >
              
              {/* Modal Header */}
              <div className="p-6 border-b border-neutral-100 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${selectedRecord.type === 'query' ? 'bg-primary-50 text-primary-green' : 'bg-emerald-50 text-emerald-600'}`}>
                    {selectedRecord.type === 'query' ? <FaQuestionCircle size={14} /> : <FaCalendarCheck size={14} />}
                  </div>
                  <h3 className="font-poppins font-bold text-neutral-900 text-lg">
                    {selectedRecord.type === 'query' ? 'Query Submission' : 'Appointment Details'}
                  </h3>
                </div>
                <button
                  onClick={() => setSelectedRecord(null)}
                  className="w-8 h-8 flex items-center justify-center rounded-lg text-neutral-400 hover:text-neutral-600 hover:bg-neutral-50 transition-colors font-bold text-base"
                >
                  &times;
                </button>
              </div>

              {/* Modal Body */}
              <div className="p-6 space-y-4 text-sm max-h-[460px] overflow-y-auto">
                {selectedRecord.type === 'query' ? (
                  /* Query details views */
                  <div className="space-y-4.5">
                    <div className="flex gap-3">
                      <FaUser className="text-primary-green mt-1 flex-shrink-0" />
                      <div>
                        <p className="text-[10px] text-neutral-400 uppercase font-semibold">User Full Name</p>
                        <p className="font-semibold text-neutral-800">{selectedRecord.name}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex gap-3">
                        <FaPhone className="text-primary-green mt-1 flex-shrink-0" />
                        <div>
                          <p className="text-[10px] text-neutral-400 uppercase font-semibold">Phone Number</p>
                          <p className="font-semibold text-neutral-800">{selectedRecord.phone}</p>
                        </div>
                      </div>
                      <div className="flex gap-3">
                        <FaBaby className="text-primary-green mt-1 flex-shrink-0" />
                        <div>
                          <p className="text-[10px] text-neutral-400 uppercase font-semibold">Child Age</p>
                          <p className="font-semibold text-neutral-800">{selectedRecord.childAge}</p>
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <FaEnvelope className="text-primary-green mt-1 flex-shrink-0" />
                      <div>
                        <p className="text-[10px] text-neutral-400 uppercase font-semibold">Email Address</p>
                        <p className="font-medium text-neutral-700">{selectedRecord.email}</p>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <FaFileMedical className="text-primary-green mt-1 flex-shrink-0" />
                      <div>
                        <p className="text-[10px] text-neutral-400 uppercase font-semibold">Query Subject</p>
                        <p className="font-semibold text-neutral-800 leading-tight">{selectedRecord.subject}</p>
                      </div>
                    </div>

                    <div className="border-t border-neutral-100 pt-4">
                      <p className="text-[10px] text-neutral-400 uppercase font-semibold mb-1.5">Full Message</p>
                      <div className="bg-neutral-50 rounded-2xl p-4 text-xs sm:text-sm text-neutral-700 leading-relaxed max-h-[160px] overflow-y-auto border border-neutral-100">
                        {selectedRecord.message}
                      </div>
                    </div>
                  </div>
                ) : (
                  /* Appointment details views */
                  <div className="space-y-4.5">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex gap-2.5">
                        <FaUser className="text-emerald-500 mt-1 flex-shrink-0" />
                        <div>
                          <p className="text-[10px] text-neutral-400 uppercase font-semibold">Parent Name</p>
                          <p className="font-semibold text-neutral-800">{selectedRecord.parentName}</p>
                        </div>
                      </div>
                      <div className="flex gap-2.5">
                        <FaBaby className="text-emerald-500 mt-1 flex-shrink-0" />
                        <div>
                          <p className="text-[10px] text-neutral-400 uppercase font-semibold">Child Name</p>
                          <p className="font-semibold text-neutral-800">{selectedRecord.childName}</p>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex gap-2.5">
                        <FaClock className="text-emerald-500 mt-1 flex-shrink-0" />
                        <div>
                          <p className="text-[10px] text-neutral-400 uppercase font-semibold">Child Age / Gender</p>
                          <p className="font-semibold text-neutral-800">{selectedRecord.childAge} • {selectedRecord.gender}</p>
                        </div>
                      </div>
                      <div className="flex gap-2.5">
                        <FaFileMedical className="text-emerald-500 mt-1 flex-shrink-0" />
                        <div>
                          <p className="text-[10px] text-neutral-400 uppercase font-semibold">Pref. Doctor</p>
                          <p className="font-semibold text-neutral-800">{selectedRecord.doctor}</p>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex gap-2.5">
                        <FaPhone className="text-emerald-500 mt-1 flex-shrink-0" />
                        <div>
                          <p className="text-[10px] text-neutral-400 uppercase font-semibold">Phone Number</p>
                          <p className="font-semibold text-neutral-800">{selectedRecord.phone}</p>
                        </div>
                      </div>
                      <div className="flex gap-2.5">
                        <FaEnvelope className="text-emerald-500 mt-1 flex-shrink-0" />
                        <div>
                          <p className="text-[10px] text-neutral-400 uppercase font-semibold">Email Address</p>
                          <p className="font-medium text-neutral-700 truncate max-w-[160px]">{selectedRecord.email}</p>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex gap-2.5">
                        <FaCalendarCheck className="text-emerald-500 mt-1 flex-shrink-0" />
                        <div>
                          <p className="text-[10px] text-neutral-400 uppercase font-semibold">Appointment Date</p>
                          <p className="font-semibold text-neutral-800">
                            {new Date(selectedRecord.appointmentDate).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })}
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-2.5">
                        <FaClock className="text-emerald-500 mt-1 flex-shrink-0" />
                        <div>
                          <p className="text-[10px] text-neutral-400 uppercase font-semibold">Preferred Time</p>
                          <p className="font-semibold text-neutral-800">{selectedRecord.preferredTime}</p>
                        </div>
                      </div>
                    </div>

                    <div className="border-t border-neutral-100 pt-4">
                      <p className="text-[10px] text-neutral-400 uppercase font-semibold mb-1.5">Reason for Visit</p>
                      <div className="bg-neutral-50 rounded-2xl p-4 text-xs sm:text-sm text-neutral-700 leading-relaxed max-h-[160px] overflow-y-auto border border-neutral-100">
                        {selectedRecord.reason}
                      </div>
                    </div>

                    <div className="flex justify-between items-center bg-neutral-50 p-4 border border-neutral-100 rounded-2xl">
                      <div>
                        <span className="text-[10px] text-neutral-400 uppercase font-semibold">Current Status</span>
                        <p className="text-sm font-semibold mt-0.5">{selectedRecord.status}</p>
                      </div>
                      <select
                        value={selectedRecord.status}
                        onChange={(e) => {
                          handleUpdateStatus(selectedRecord._id, e.target.value);
                          setSelectedRecord(prev => ({ ...prev, status: e.target.value }));
                        }}
                        className={`text-xs font-semibold border rounded-full px-3 py-1.5 outline-none font-inter shadow-sm cursor-pointer ${getStatusBadgeClass(selectedRecord.status)}`}
                      >
                        <option value="Pending">Pending</option>
                        <option value="Confirmed">Confirmed</option>
                        <option value="Completed">Completed</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>
                    </div>
                  </div>
                )}
              </div>

              {/* Modal Footer */}
              <div className="p-6 border-t border-neutral-100 text-right bg-neutral-50/50">
                <button
                  onClick={() => setSelectedRecord(null)}
                  className="px-5 py-2.5 bg-neutral-900 hover:bg-neutral-800 text-white font-semibold text-sm rounded-xl transition-colors"
                >
                  Close Detail
                </button>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default AdminDashboard;
