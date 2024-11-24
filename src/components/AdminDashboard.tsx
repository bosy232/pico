import React from 'react';
import { Shield, Users, Database, ExternalLink, LogOut, AlertCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const DATA_LINKS = [
  { id: 1, url: 'http://105.198.238.37/', label: 'Data Source 1' },
  { id: 2, url: 'http://105.198.238.38/', label: 'Data Source 2' },
  { id: 3, url: 'http://105.198.238.39/', label: 'Data Source 3' },
  { id: 4, url: 'http://105.198.238.40/', label: 'Data Source 4' },
];

export default function AdminDashboard() {
  const { user, logout } = useAuth();

  const filteredDataLinks = DATA_LINKS.filter(link => 
    user?.allowedDataSources.includes(link.id)
  );

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Shield className="h-5 w-5 text-indigo-600" />
            <span className="text-sm font-medium text-gray-600">
              Welcome, {user?.username}
            </span>
          </div>
          <button
            onClick={logout}
            className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 transition-colors duration-200"
          >
            <LogOut className="h-4 w-4 mr-1" />
            Logout
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center space-x-3">
            <Users className="h-6 w-6 text-indigo-600" />
            <h2 className="text-lg font-semibold text-gray-900">User Permissions</h2>
          </div>
          <p className="mt-2 text-sm text-gray-600">
            Your current permissions and access levels
          </p>
          <ul className="mt-4 space-y-2">
            {user?.permissions.map(permission => (
              <li key={permission.id} className="flex items-center space-x-2">
                <Shield className="h-4 w-4 text-green-500" />
                <span className="text-sm text-gray-700">{permission.description}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center space-x-3">
            <Database className="h-6 w-6 text-indigo-600" />
            <h2 className="text-lg font-semibold text-gray-900">Your Data Sources</h2>
          </div>
          <p className="mt-2 text-sm text-gray-600">
            Access your assigned data sources
          </p>
          {filteredDataLinks.length > 0 ? (
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
              {filteredDataLinks.map((link) => (
                <a
                  key={link.id}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-between px-4 py-2 border border-gray-200 rounded-md hover:bg-indigo-50 hover:border-indigo-300 transition-colors duration-200 group"
                >
                  <span className="text-sm font-medium text-gray-700 group-hover:text-indigo-700">
                    {link.label}
                  </span>
                  <ExternalLink className="h-4 w-4 text-gray-400 group-hover:text-indigo-600" />
                </a>
              ))}
            </div>
          ) : (
            <div className="mt-4 flex items-center space-x-2 text-amber-600">
              <AlertCircle className="h-5 w-5" />
              <span className="text-sm">No data sources assigned to your account.</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}