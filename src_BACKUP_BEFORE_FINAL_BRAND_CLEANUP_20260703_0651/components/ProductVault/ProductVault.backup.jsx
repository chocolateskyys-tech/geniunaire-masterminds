import { useEffect, useState } from 'react';

const STORAGE_KEY = 'geniunaireProductVault';

function ProductVault({ onReturn }) {
  const [copyStatus, setCopyStatus] = useState('');
  const [form, setForm] = useState({
    productName: '',
    baseType: '',
    clientBrand: '',
    category: '',
    sampleStatus: '',
    labelStatus: '',
    packagingNotes: '',
    launchStatus: '',
    priceRange: '',
    notes: '',
  });

  const [products, setProducts] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
  }, [products]);

  function updateForm(field, value) {
    setForm({ ...form, [field]: value });
  }

  function addProduct(event) {
    event.preventDefault();

    const newProduct = {
      id: Date.now(),
      ...form,
      productName: form.productName || 'Unnamed Product',
      baseType: form.baseType || 'Custom / White Label',
      clientBrand: form.clientBrand || 'GM House Brand / Unassigned',
      category: form.category || 'General Product',
      sampleStatus: form.sampleStatus || 'Needs Sample',
      labelStatus: form.labelStatus || 'Needs Label',
      packagingNotes: form.packagingNotes || 'Packaging notes not added.',
      launchStatus: form.launchStatus || 'Draft',
      priceRange: form.priceRange || 'TBD',
      notes: form.notes || '',
      createdAt: new Date().toLocaleString(),
    };

    setProducts([newProduct, ...products]);
    setForm({
      productName: '',
      baseType: '',
      clientBrand: '',
      category: '',
      sampleStatus: '',
      labelStatus: '',
      packagingNotes: '',
      launchStatus: '',
      priceRange: '',
      notes: '',
    });
    setCopyStatus('Product record saved.');
  }

  function deleteProduct(id) {
    setProducts(products.filter((product) => product.id !== id));
  }

  function buildProductBrief(product) {
    return [
      'PRODUCT VAULT BRIEF',
      '',
      `Product: ${product.productName}`,
      `Base Type: ${product.baseType}`,
      `Client / Brand: ${product.clientBrand}`,
      `Category: ${product.category}`,
      `Sample Status: ${product.sampleStatus}`,
      `Label Status: ${product.labelStatus}`,
      `Launch Status: ${product.launchStatus}`,
      `Price Range: ${product.priceRange}`,
      `Created: ${product.createdAt}`,
      '',
      'PACKAGING NOTES:',
      product.packagingNotes,
      '',
      'GENIUNAIRE PRODUCT DIRECTION:',
      'Confirm the product base, create or update the brand label, prepare sample/testing notes, approve packaging, then connect the product to the client launch plan, checkout link, promo materials, and website/store placement.',
      '',
      'NOTES:',
      product.notes || 'No notes added.',
    ].join('\n');
  }

  async function copyText(text, label) {
    try {
      await navigator.clipboard.writeText(text);
      setCopyStatus(`Copied ${label}.`);
    } catch (error) {
      setCopyStatus('Copy failed. Select and copy manually.');
    }
  }

  const productRules = [
    'PRODUCT VAULT RULES',
    '',
    'The Product Vault tracks products already created, tested, sampled, white-labeled, repackaged, or ready for client branding.',
    'One product base can become multiple branded products by changing the label, packaging, brand name, scent/flavor/angle, or target audience.',
    'Samples should be reviewed before launch when possible.',
    'Do not list products as approved until the base, label, packaging, and client direction are clear.',
  ].join('\n');

  return (
    <main className="min-h-screen bg-black text-slate-300 px-6 py-10">
      <section className="max-w-6xl mx-auto">
        <p className="text-xs text-purple-400 tracking-[0.35em] uppercase mb-3">
          Geniunaire MasterMinds // Product Creation
        </p>

        <h1 className="text-6xl font-bold text-purple-400 mb-4">
          PRODUCT VAULT
        </h1>

        <p className="text-slate-400 max-w-3xl mb-8">
          Track white-label products, client brand options, samples, labels, packaging, product approvals, and launch-ready inventory.
        </p>

        {copyStatus && <p className="mb-6 text-purple-300">{copyStatus}</p>}

        <div className="border border-purple-900 rounded-xl p-6 mb-8 bg-black/40">
          <h2 className="text-purple-300 mb-2">Product Vault Rule</h2>
          <p className="text-slate-500 text-sm mb-5">
            One product base can become many branded products through label, packaging, positioning, and client brand changes.
          </p>

          <button
            type="button"
            onClick={() => copyText(productRules, 'product vault rules')}
            className="px-6 py-3 bg-purple-900 border border-purple-500 rounded"
          >
            Copy Product Rules
          </button>
        </div>

        <form onSubmit={addProduct} className="border border-purple-900 rounded-xl p-6 mb-8 bg-black/40">
          <h2 className="text-purple-300 mb-5">Add Product Record</h2>

          <input value={form.productName} onChange={(e) => updateForm('productName', e.target.value)} placeholder="Product Name" className="w-full mb-4 bg-black border border-slate-700 px-4 py-3 rounded" />

          <select value={form.baseType} onChange={(e) => updateForm('baseType', e.target.value)} className="w-full mb-4 bg-black border border-slate-700 px-4 py-3 rounded">
            <option value="">Base Type</option>
            <option value="Handmade / From Scratch">Handmade / From Scratch</option>
            <option value="White Label Ready">White Label Ready</option>
            <option value="Repurposed / Rebranded Base">Repurposed / Rebranded Base</option>
            <option value="Digital Product">Digital Product</option>
            <option value="Sample Only">Sample Only</option>
          </select>

          <input value={form.clientBrand} onChange={(e) => updateForm('clientBrand', e.target.value)} placeholder="Client / Brand Name" className="w-full mb-4 bg-black border border-slate-700 px-4 py-3 rounded" />
          <input value={form.category} onChange={(e) => updateForm('category', e.target.value)} placeholder="Category: lotion, candle, lip gloss, ebook, etc." className="w-full mb-4 bg-black border border-slate-700 px-4 py-3 rounded" />

          <select value={form.sampleStatus} onChange={(e) => updateForm('sampleStatus', e.target.value)} className="w-full mb-4 bg-black border border-slate-700 px-4 py-3 rounded">
            <option value="">Sample Status</option>
            <option value="Needs Sample">Needs Sample</option>
            <option value="Sample Created">Sample Created</option>
            <option value="Sent For Review">Sent For Review</option>
            <option value="Client Approved">Client Approved</option>
            <option value="Tested / Ready">Tested / Ready</option>
          </select>

          <select value={form.labelStatus} onChange={(e) => updateForm('labelStatus', e.target.value)} className="w-full mb-4 bg-black border border-slate-700 px-4 py-3 rounded">
            <option value="">Label Status</option>
            <option value="Needs Label">Needs Label</option>
            <option value="Label Drafted">Label Drafted</option>
            <option value="Label Approved">Label Approved</option>
            <option value="Packaging Ready">Packaging Ready</option>
          </select>

          <textarea value={form.packagingNotes} onChange={(e) => updateForm('packagingNotes', e.target.value)} placeholder="Packaging notes, label direction, scent/flavor/angle, client changes." rows="3" className="w-full mb-4 bg-black border border-slate-700 px-4 py-3 rounded" />

          <select value={form.launchStatus} onChange={(e) => updateForm('launchStatus', e.target.value)} className="w-full mb-4 bg-black border border-slate-700 px-4 py-3 rounded">
            <option value="">Launch Status</option>
            <option value="Draft">Draft</option>
            <option value="Ready For Client Review">Ready For Client Review</option>
            <option value="Approved For Launch">Approved For Launch</option>
            <option value="Needs Checkout">Needs Checkout</option>
            <option value="Live / Selling">Live / Selling</option>
          </select>

          <input value={form.priceRange} onChange={(e) => updateForm('priceRange', e.target.value)} placeholder="Price Range / Wholesale / Retail" className="w-full mb-4 bg-black border border-slate-700 px-4 py-3 rounded" />
          <textarea value={form.notes} onChange={(e) => updateForm('notes', e.target.value)} placeholder="Extra product notes, supplier notes, client notes, launch notes." rows="4" className="w-full mb-5 bg-black border border-slate-700 px-4 py-3 rounded" />

          <button className="px-6 py-3 bg-purple-900 border border-purple-500 rounded">
            Save Product Record
          </button>
        </form>

        <div className="border border-purple-900 rounded-xl p-6 mb-8 bg-black/40">
          <h2 className="text-purple-300 mb-5">Saved Products</h2>

          {products.length === 0 && <p className="text-slate-500">No products saved yet.</p>}

          {products.map((product) => (
            <div key={product.id} className="border border-slate-800 rounded-xl p-5 mb-5">
              <p className="text-xs uppercase tracking-widest text-slate-500 mb-2">
                {product.category} // {product.launchStatus}
              </p>

              <h2 className="text-2xl text-purple-300 font-bold mb-2">
                {product.productName}
              </h2>

              <p className="text-slate-500 text-sm mb-2">
                Brand: {product.clientBrand} // Base: {product.baseType}
              </p>

              <p className="text-slate-500 text-sm mb-2">
                Sample: {product.sampleStatus} // Label: {product.labelStatus}
              </p>

              <p className="text-slate-400 text-sm mb-4">
                {product.packagingNotes}
              </p>

              <div className="flex flex-wrap gap-3">
                <button type="button" onClick={() => copyText(buildProductBrief(product), product.productName)} className="px-4 py-2 bg-purple-900 border border-purple-500 rounded">
                  Copy Product Brief
                </button>

                <button type="button" onClick={() => deleteProduct(product.id)} className="px-4 py-2 border border-red-900 text-red-300 rounded hover:bg-red-950">
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>

        <button type="button" onClick={onReturn} className="px-6 py-3 border border-slate-700 rounded hover:border-purple-500">
          Return To Entry Gate
        </button>
      </section>
    </main>
  );
}

export default ProductVault;