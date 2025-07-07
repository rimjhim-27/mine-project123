import React, { useState } from 'react';
import { Search, Plus, Edit, Trash2, X, Save, Star } from 'lucide-react';

interface Package {
  id: string;
  name: string;
  description: string;
  price: number;
  original_price?: number;
  tests: string[];
  category: string;
  popular: boolean;
  home_collection: boolean;
}

const initialPackages: Package[] = [
  { id: 'P001', name: 'Complete Health Checkup', description: 'Comprehensive health screening with 45+ parameters including CBC, lipid profile, liver function, kidney function, and diabetes screening.', price: 1499, original_price: 2500, tests: ['Complete Blood Count', 'Lipid Profile', 'Liver Function Test', 'Kidney Function Test', 'HbA1c', 'Thyroid Profile'], category: 'Health Checkup', popular: true, home_collection: true },
  { id: 'P002', name: 'Diabetes Care Package', description: 'Essential tests for diabetes monitoring and management including glucose levels, HbA1c, and related parameters.', price: 899, original_price: 1200, tests: ['Fasting Glucose', 'HbA1c', 'Post Prandial Glucose', 'Insulin Levels'], category: 'Diabetes', popular: false, home_collection: true },
  { id: 'P003', name: 'Heart Health Package', description: 'Comprehensive cardiac risk assessment with lipid profile, cardiac markers, and ECG interpretation.', price: 1299, original_price: 1800, tests: ['Lipid Profile', 'CRP', 'Troponin-I', 'ECG', 'Homocysteine'], category: 'Cardiac', popular: true, home_collection: true },
];

const PackagesManager: React.FC = () => {
  const [packages, setPackages] = useState<Package[]>(initialPackages);
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    original_price: '',
    category: '',
    tests: '',
    popular: false,
    home_collection: true,
  });

  const filtered = packages.filter(pk => 
    pk.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    pk.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const openModal = (pkg?: Package) => {
    if (pkg) {
      setEditingId(pkg.id);
      setFormData({
        name: pkg.name,
        description: pkg.description,
        price: pkg.price.toString(),
        original_price: pkg.original_price?.toString() || '',
        category: pkg.category,
        tests: pkg.tests.join(', '),
        popular: pkg.popular,
        home_collection: pkg.home_collection,
      });
    } else {
      setEditingId(null);
      setFormData({ name: '', description: '', price: '', original_price: '', category: '', tests: '', popular: false, home_collection: true });
    }
    setShowModal(true);
  };

  const handleSave = () => {
    const newPkg: Package = {
      id: editingId || `P${Date.now()}`,
      name: formData.name,
      description: formData.description,
      price: Number(formData.price),
      original_price: formData.original_price ? Number(formData.original_price) : undefined,
      tests: formData.tests.split(',').map(t => t.trim()).filter(t => t),
      category: formData.category,
      popular: formData.popular,
      home_collection: formData.home_collection,
    };

    setPackages(prev =>
      editingId
        ? prev.map(p => (p.id === editingId ? newPkg : p))
        : [...prev, newPkg]
    );
    setShowModal(false);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Delete this package?')) {
      setPackages(prev => prev.filter(p => p.id !== id));
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex sm:flex-row flex-col gap-4 justify-between">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search packages..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 border rounded-lg focus:ring"
          />
        </div>
        <button onClick={() => openModal()} className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg">
          <Plus className="w-4 h-4" /> <span>Add New Package</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filtered.map(pkg => (
          <div key={pkg.id} className="bg-white rounded-xl shadow border p-6">
            <div className="flex justify-between mb-4">
              <div>
                <div className="flex items-center space-x-2 mb-2">
                  <h3 className="font-semibold">{pkg.name}</h3>
                  {pkg.popular && <Star className="w-5 h-5 text-yellow-500" />}
                </div>
                <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                  {pkg.category}
                </span>
              </div>

              <div className="flex space-x-2">
                <button onClick={() => openModal(pkg)} className="text-blue-600"><Edit className="w-4 h-4" /></button>
                <button onClick={() => handleDelete(pkg.id)} className="text-red-600"><Trash2 className="w-4 h-4" /></button>
              </div>
            </div>

            <p className="text-sm text-gray-600 mb-4">{pkg.description}</p>

            <div className="space-y-2 mb-4">
              <div className="flex justify-between">
                <span>Price:</span>
                <div className="flex items-center space-x-2">
                  <span className="font-bold">₹{pkg.price}</span>
                  {pkg.original_price && <span className="line-through text-gray-400">₹{pkg.original_price}</span>}
                </div>
              </div>
              {pkg.original_price && (
                <div className="flex justify-between text-sm">
                  <span>Savings:</span>
                  <span className="font-semibold text-green-600">
                    ₹{pkg.original_price - pkg.price} ({Math.round(((pkg.original_price - pkg.price) / pkg.original_price) * 100)}% off)
                  </span>
                </div>
              )}
              <div className="flex justify-between text-sm">
                <span>Tests Included:</span>
                <span>{pkg.tests.length}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Home Collection:</span>
                <span className={pkg.home_collection ? 'text-green-600' : 'text-red-600'}>
                  {pkg.home_collection ? 'Yes' : 'No'}
                </span>
              </div>
            </div>

            <div>
              <p className="font-medium mb-2">Included Tests:</p>
              {pkg.tests.slice(0, 4).map((test, i) => (
                <div key={i} className="flex items-center space-x-2 text-sm text-gray-600">
                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full" />
                  <span>{test}</span>
                </div>
              ))}
              {pkg.tests.length > 4 && (
                <div className="text-sm text-blue-600 font-medium">
                  +{pkg.tests.length - 4} more tests
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between p-6 border-b">
              <h3 className="font-semibold">{editingId ? 'Edit Package' : 'Add New Package'}</h3>
              <button onClick={() => setShowModal(false)}><X /></button>
            </div>

            <div className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label>Package Name</label>
                  <input type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full border rounded p-2" />
                </div>
                <div>
                  <label>Category</label>
                  <input type="text" value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} className="w-full border rounded p-2" />
                </div>
              </div>

              <div>
                <label>Description</label>
                <textarea value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} rows={3} className="w-full border rounded p-2" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label>Price (₹)</label>
                  <input type="number" value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} className="w-full border rounded p-2" />
                </div>
                <div>
                  <label>Original Price (₹)</label>
                  <input type="number" value={formData.original_price} onChange={e => setFormData({...formData, original_price: e.target.value})} className="w-full border rounded p-2" />
                </div>
              </div>

              <div>
                <label>Included Tests</label>
                <textarea value={formData.tests} onChange={e => setFormData({...formData, tests: e.target.value})} rows={4} className="w-full border rounded p-2" placeholder="Comma-separated" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <label className="flex items-center">
                  <input type="checkbox" checked={formData.popular} onChange={e => setFormData({...formData, popular: e.target.checked})} />
                  <span className="ml-2">Mark as Popular</span>
                </label>
                <label className="flex items-center">
                  <input type="checkbox" checked={formData.home_collection} onChange={e => setFormData({...formData, home_collection: e.target.checked})} />
                  <span className="ml-2">Home Collection Available</span>
                </label>
              </div>

              <div className="flex justify-end space-x-3 pt-6 border-t">
                <button onClick={() => setShowModal(false)} className="border px-4 py-2 rounded">Cancel</button>
                <button onClick={handleSave} className="bg-blue-600 text-white px-4 py-2 rounded flex items-center">
                  <Save className="w-4 h-4 mr-2" /> {editingId ? 'Update Package' : 'Add Package'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PackagesManager;
