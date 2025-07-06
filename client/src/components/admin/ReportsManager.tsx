import React, { useState } from 'react';
import { 
  Search, 
  Download, 
  Eye, 
  Filter,
  Calendar,
  FileText,
  User,
  Clock
} from 'lucide-react';

const ReportsManager: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('all');

  // Mock reports data
  const reports = [
    {
      id: 'R001',
      bookingId: 'B001',
      patientName: 'राज कुमार',
      testName: 'Complete Health Checkup',
      reportUrl: '/reports/R001_complete_health_checkup.pdf',
      reportPassword: 'RAJ123',
      generatedAt: '2024-01-15T14:30:00Z',
      downloadedAt: '2024-01-15T16:45:00Z',
      status: 'downloaded'
    },
    {
      id: 'R002',
      bookingId: 'B002',
      patientName: 'प्रिया शर्मा',
      testName: 'Lipid Profile',
      reportUrl: '/reports/R002_lipid_profile.pdf',
      reportPassword: 'PRIYA456',
      generatedAt: '2024-01-14T10:20:00Z',
      downloadedAt: null,
      status: 'ready'
    },
    {
      id: 'R003',
      bookingId: 'B003',
      patientName: 'अमित सिंह',
      testName: 'Thyroid Profile',
      reportUrl: '/reports/R003_thyroid_profile.pdf',
      reportPassword: 'AMIT789',
      generatedAt: '2024-01-13T16:15:00Z',
      downloadedAt: '2024-01-13T18:30:00Z',
      status: 'downloaded'
    },
    {
      id: 'R004',
      bookingId: 'B004',
      patientName: 'सुनीता देवी',
      testName: 'Diabetes Care Package',
      reportUrl: null,
      reportPassword: null,
      generatedAt: null,
      downloadedAt: null,
      status: 'processing'
    }
  ];

  const filteredReports = reports.filter(report => {
    const matchesSearch = report.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         report.testName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         report.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         report.bookingId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || report.status === statusFilter;
    
    let matchesDate = true;
    if (dateFilter !== 'all' && report.generatedAt) {
      const reportDate = new Date(report.generatedAt);
      const today = new Date();
      const daysDiff = Math.floor((today.getTime() - reportDate.getTime()) / (1000 * 60 * 60 * 24));
      
      switch (dateFilter) {
        case 'today':
          matchesDate = daysDiff === 0;
          break;
        case 'week':
          matchesDate = daysDiff <= 7;
          break;
        case 'month':
          matchesDate = daysDiff <= 30;
          break;
      }
    }
    
    return matchesSearch && matchesStatus && matchesDate;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'downloaded':
        return 'bg-green-100 text-green-800';
      case 'ready':
        return 'bg-blue-100 text-blue-800';
      case 'processing':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'downloaded':
        return <Download className="w-4 h-4 text-green-500" />;
      case 'ready':
        return <FileText className="w-4 h-4 text-blue-500" />;
      case 'processing':
        return <Clock className="w-4 h-4 text-yellow-500" />;
      default:
        return <Clock className="w-4 h-4 text-gray-500" />;
    }
  };

  const handleDownloadReport = (report: any) => {
    if (report.reportUrl) {
      // In real app, this would download the actual file
      console.log(`Downloading report ${report.id}`);
      window.open(report.reportUrl, '_blank');
    }
  };

  const handleViewReport = (report: any) => {
    if (report.reportUrl) {
      // In real app, this would open the report in a viewer
      console.log(`Viewing report ${report.id}`);
    }
  };

  const handleGenerateReport = (reportId: string) => {
    // In real app, this would trigger report generation
    console.log(`Generating report ${reportId}`);
  };

  return (
    <div className="space-y-6">
      {/* Header Actions */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between">
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search reports..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>

          {/* Status Filter */}
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="all">All Status</option>
              <option value="processing">Processing</option>
              <option value="ready">Ready</option>
              <option value="downloaded">Downloaded</option>
            </select>
          </div>

          {/* Date Filter */}
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <select
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              className="pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="all">All Time</option>
              <option value="today">Today</option>
              <option value="week">This Week</option>
              <option value="month">This Month</option>
            </select>
          </div>
        </div>

        <div className="text-sm text-gray-600">
          Total Reports: {reports.length} | Ready: {reports.filter(r => r.status === 'ready').length} | Downloaded: {reports.filter(r => r.status === 'downloaded').length}
        </div>
      </div>

      {/* Reports Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Report ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Patient
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Test
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Generated
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Password
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredReports.map((report) => (
                <tr key={report.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {report.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                        <User className="w-4 h-4 text-blue-600" />
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-900">{report.patientName}</div>
                        <div className="text-sm text-gray-500">Booking: {report.bookingId}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {report.testName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {report.generatedAt ? (
                      <div>
                        <div>{new Date(report.generatedAt).toLocaleDateString()}</div>
                        <div className="text-xs text-gray-500">
                          {new Date(report.generatedAt).toLocaleTimeString()}
                        </div>
                      </div>
                    ) : (
                      <span className="text-gray-400">Not generated</span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(report.status)}
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(report.status)}`}>
                        {report.status}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {report.reportPassword ? (
                      <code className="bg-gray-100 px-2 py-1 rounded text-xs font-mono">
                        {report.reportPassword}
                      </code>
                    ) : (
                      <span className="text-gray-400">-</span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center space-x-2">
                      {report.status === 'processing' ? (
                        <button
                          onClick={() => handleGenerateReport(report.id)}
                          className="text-blue-600 hover:text-blue-900"
                        >
                          Generate
                        </button>
                      ) : report.reportUrl ? (
                        <>
                          <button
                            onClick={() => handleViewReport(report)}
                            className="text-blue-600 hover:text-blue-900"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDownloadReport(report)}
                            className="text-green-600 hover:text-green-900"
                          >
                            <Download className="w-4 h-4" />
                          </button>
                        </>
                      ) : (
                        <span className="text-gray-400">-</span>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <FileText className="w-6 h-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Reports</p>
              <p className="text-2xl font-bold text-gray-900">{reports.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
              <Clock className="w-6 h-6 text-yellow-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Processing</p>
              <p className="text-2xl font-bold text-gray-900">
                {reports.filter(r => r.status === 'processing').length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <FileText className="w-6 h-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Ready</p>
              <p className="text-2xl font-bold text-gray-900">
                {reports.filter(r => r.status === 'ready').length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <Download className="w-6 h-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Downloaded</p>
              <p className="text-2xl font-bold text-gray-900">
                {reports.filter(r => r.status === 'downloaded').length}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportsManager;