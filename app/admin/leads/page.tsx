'use client';

import React, { useState, useEffect } from 'react';
import { PhoneRingingIcon, LocationPinIcon, ClockIcon, ShieldCheckIcon } from '@/components/icons';

interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
  urgency?: string;
  problem_type?: string;
  location_in_home?: string;
  contact_preference: string;
  status: 'new' | 'contacted' | 'in_progress' | 'completed' | 'cancelled';
  priority: boolean;
  notes?: string;
  created_at: string;
  updated_at: string;
}

interface Stats {
  total: number;
  new: number;
  contacted: number;
  in_progress: number;
  completed: number;
}

export default function AdminLeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [stats, setStats] = useState<Stats>({ total: 0, new: 0, contacted: 0, in_progress: 0, completed: 0 });
  const [loading, setLoading] = useState(true);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [filter, setFilter] = useState<string>('all');

  useEffect(() => {
    fetchLeads();
  }, []);

  const fetchLeads = async () => {
    try {
      const response = await fetch('/api/admin/leads');
      const result = await response.json();
      if (result.success) {
        setLeads(result.data);
        setStats(result.stats);
      }
    } catch (error) {
      console.error('Failed to fetch leads:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateLeadStatus = async (id: string, status: string) => {
    try {
      const response = await fetch('/api/admin/leads', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status }),
      });
      if (response.ok) {
        fetchLeads();
      }
    } catch (error) {
      console.error('Failed to update lead:', error);
    }
  };

  const updatePriority = async (id: string, priority: boolean) => {
    try {
      const response = await fetch('/api/admin/leads', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, priority }),
      });
      if (response.ok) {
        fetchLeads();
      }
    } catch (error) {
      console.error('Failed to update priority:', error);
    }
  };

  const deleteLead = async (id: string) => {
    if (!confirm('Are you sure you want to delete this lead?')) return;
    
    try {
      const response = await fetch(`/api/admin/leads?id=${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        fetchLeads();
        setSelectedLead(null);
      }
    } catch (error) {
      console.error('Failed to delete lead:', error);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new':
        return 'bg-emergency text-white';
      case 'contacted':
        return 'bg-trust text-white';
      case 'in_progress':
        return 'bg-yellow-500 text-white';
      case 'completed':
        return 'bg-success text-white';
      default:
        return 'bg-gray-400 text-white';
    }
  };

  const filteredLeads = filter === 'all' ? leads : leads.filter(l => l.status === filter);

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-professional mb-2">Lead Management</h2>
        <p className="text-gray-600">
          Manage customer inquiries and emergency requests
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid md:grid-cols-5 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Total Leads</p>
              <p className="text-3xl font-bold text-professional">{stats.total}</p>
            </div>
            <PhoneRingingIcon size={40} className="text-professional opacity-20" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6 cursor-pointer hover:shadow-lg transition-shadow" onClick={() => setFilter('new')}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">New</p>
              <p className="text-3xl font-bold text-emergency">{stats.new}</p>
            </div>
            <ClockIcon size={40} className="text-emergency opacity-20" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6 cursor-pointer hover:shadow-lg transition-shadow" onClick={() => setFilter('contacted')}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Contacted</p>
              <p className="text-3xl font-bold text-trust">{stats.contacted}</p>
            </div>
            <LocationPinIcon size={40} className="text-trust opacity-20" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6 cursor-pointer hover:shadow-lg transition-shadow" onClick={() => setFilter('in_progress')}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">In Progress</p>
              <p className="text-3xl font-bold text-yellow-600">{stats.in_progress}</p>
            </div>
            <ShieldCheckIcon size={40} className="text-yellow-600 opacity-20" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6 cursor-pointer hover:shadow-lg transition-shadow" onClick={() => setFilter('completed')}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Completed</p>
              <p className="text-3xl font-bold text-success">{stats.completed}</p>
            </div>
            <PhoneRingingIcon size={40} className="text-success opacity-20" />
          </div>
        </div>
      </div>

      {/* Filter Buttons */}
      <div className="mb-6 flex gap-2">
        <button
          onClick={() => setFilter('all')}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            filter === 'all' ? 'bg-professional text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          All Leads
        </button>
        <button
          onClick={() => setFilter('new')}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            filter === 'new' ? 'bg-emergency text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          New
        </button>
        <button
          onClick={() => setFilter('contacted')}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            filter === 'contacted' ? 'bg-trust text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          Contacted
        </button>
        <button
          onClick={() => setFilter('in_progress')}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            filter === 'in_progress' ? 'bg-yellow-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          In Progress
        </button>
        <button
          onClick={() => setFilter('completed')}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            filter === 'completed' ? 'bg-success text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          Completed
        </button>
      </div>

      {loading ? (
        <div className="bg-white rounded-lg shadow p-12 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-trust mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading leads...</p>
        </div>
      ) : filteredLeads.length === 0 ? (
        <div className="bg-white rounded-lg shadow p-8 text-center text-gray-500">
          <PhoneRingingIcon size={64} className="mx-auto mb-4 opacity-20" />
          <p className="text-lg font-medium">No leads found</p>
          <p className="text-sm">Leads will appear here when customers submit forms</p>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Priority
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Customer
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Contact
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Service
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Created
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredLeads.map((lead) => (
                  <tr key={lead.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button
                        onClick={() => updatePriority(lead.id, !lead.priority)}
                        className={`text-2xl ${lead.priority ? 'text-emergency' : 'text-gray-300'}`}
                      >
                        ★
                      </button>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{lead.name}</div>
                      {lead.urgency && (
                        <div className="text-xs text-gray-500 capitalize">{lead.urgency}</div>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900">{lead.phone}</div>
                      <div className="text-xs text-gray-500">{lead.email}</div>
                      <div className="text-xs text-trust capitalize">{lead.contact_preference}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{lead.service}</div>
                      {lead.problem_type && (
                        <div className="text-xs text-gray-500">{lead.problem_type}</div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <select
                        value={lead.status}
                        onChange={(e) => updateLeadStatus(lead.id, e.target.value)}
                        className={`text-xs px-2 py-1 rounded-full font-medium ${getStatusColor(lead.status)}`}
                      >
                        <option value="new">New</option>
                        <option value="contacted">Contacted</option>
                        <option value="in_progress">In Progress</option>
                        <option value="completed">Completed</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(lead.created_at).toLocaleDateString()}<br />
                      {new Date(lead.created_at).toLocaleTimeString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                      <button
                        onClick={() => setSelectedLead(lead)}
                        className="text-trust hover:text-trust-dark"
                      >
                        View
                      </button>
                      <a
                        href={`tel:${lead.phone}`}
                        className="text-success hover:text-success-dark"
                      >
                        Call
                      </a>
                      <button
                        onClick={() => deleteLead(lead.id)}
                        className="text-emergency hover:text-emergency-dark"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Lead Detail Modal */}
      {selectedLead && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 flex justify-between items-center">
              <h3 className="text-2xl font-bold text-professional">Lead Details</h3>
              <button
                onClick={() => setSelectedLead(null)}
                className="text-gray-500 hover:text-gray-700 text-2xl"
              >
                ×
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="text-sm font-semibold text-gray-600">Name</label>
                <p className="text-lg">{selectedLead.name}</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-semibold text-gray-600">Phone</label>
                  <p><a href={`tel:${selectedLead.phone}`} className="text-trust hover:underline">{selectedLead.phone}</a></p>
                </div>
                <div>
                  <label className="text-sm font-semibold text-gray-600">Email</label>
                  <p><a href={`mailto:${selectedLead.email}`} className="text-trust hover:underline break-all">{selectedLead.email}</a></p>
                </div>
              </div>
              <div>
                <label className="text-sm font-semibold text-gray-600">Service Requested</label>
                <p>{selectedLead.service}</p>
              </div>
              {selectedLead.problem_type && (
                <div>
                  <label className="text-sm font-semibold text-gray-600">Problem Type</label>
                  <p className="capitalize">{selectedLead.problem_type}</p>
                </div>
              )}
              {selectedLead.location_in_home && (
                <div>
                  <label className="text-sm font-semibold text-gray-600">Location in Home</label>
                  <p className="capitalize">{selectedLead.location_in_home}</p>
                </div>
              )}
              {selectedLead.urgency && (
                <div>
                  <label className="text-sm font-semibold text-gray-600">Urgency</label>
                  <p className="capitalize font-semibold text-emergency">{selectedLead.urgency}</p>
                </div>
              )}
              <div>
                <label className="text-sm font-semibold text-gray-600">Message</label>
                <p className="bg-gray-50 p-4 rounded-lg">{selectedLead.message}</p>
              </div>
              <div>
                <label className="text-sm font-semibold text-gray-600">Preferred Contact Method</label>
                <p className="capitalize">{selectedLead.contact_preference}</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-semibold text-gray-600">Created</label>
                  <p>{new Date(selectedLead.created_at).toLocaleString()}</p>
                </div>
                <div>
                  <label className="text-sm font-semibold text-gray-600">Status</label>
                  <p className="capitalize">{selectedLead.status}</p>
                </div>
              </div>
            </div>
            <div className="p-6 border-t border-gray-200 flex gap-3">
              <a
                href={`tel:${selectedLead.phone}`}
                className="flex-1 bg-success text-white px-4 py-3 rounded-lg font-semibold text-center hover:bg-success-dark transition-colors"
              >
                Call Customer
              </a>
              <a
                href={`mailto:${selectedLead.email}`}
                className="flex-1 bg-trust text-white px-4 py-3 rounded-lg font-semibold text-center hover:bg-trust-dark transition-colors"
              >
                Send Email
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
