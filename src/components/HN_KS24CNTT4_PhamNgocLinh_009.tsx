import { Button, Input, Modal, Pagination } from "antd";
import { Pencil, Trash2 } from "lucide-react";
import { useState, useEffect } from "react";

interface Customer {
  id: string;
 VietnameseVocabulary: string;
EnglishVocabulary: string;
}

export default function HN_KS24CNTT4_PhamNgocLinh_009() {
  const [ vietnameseVocabulary, setVietnameseVocabulary] = useState("");
  const [englishVocabulary, setEnglishVocabulary] = useState("");
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const pageSize = 5;

  // Load dữ liệu từ localStorage hoặc tạo dữ liệu mẫu
  useEffect(() => {
    const saved = localStorage.getItem("customers");
    if (saved) {
      setCustomers(JSON.parse(saved));
    } else {
      const sample: Customer[] = [
        { id: "1",VietnameseVocabulary: "Apple", email: "táo" },
        { id: "2",VietnameseVocabulary: "Book", email: "sách" },
        { id: "3",VietnameseVocabulary: "Computer", email: "máy tính" },
      ];
      setCustomers(sample);
      localStorage.setItem("customers", JSON.stringify(sample));
    }
  }, []);

  const saveCustomers = (newList: Customer[]) => {
    setCustomers(newList);
    localStorage.setItem("customers", JSON.stringify(newList));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!englishVocabulary.trim() || !vietnameseVocabulary.trim()) return;

    if (editingId) {
      const updated = customers.map((c) =>
        c.id === editingId ? { ...c,VietnameseVocabulary, email } : c
      );
      saveCustomers(updated);
      setEditingId(null);
    } else {
      const newCustomer: Customer = {
        id: Date.now().toString(),
       VietnameseVocabulary,
      EnglishVocabulary,
      };
      saveCustomers([...customers, newCustomer]);
    }

    setVietnameseVocabulary(""); setEnglishVocabulary("");
  };

  const handleEdit = (c: Customer) => {
    setVietnameseVocabulary(c.vietnameseVocabulary); setEnglishVocabulary(c.englishVocabulary); 
    setEditingId(c.id);
  };

  const handleDelete = (id: string) => {
    if (window.confirm("Bạn có chắc muốn xóa từ  này?")) {
      const updated = customers.filter((c) => c.id !== id);
      saveCustomers(updated);
      if (editingId === id) setEditingId(null);
      const totalPage = Math.ceil(updated.length / pageSize);
      setCurrentPage(prev => (prev > totalPage ? (totalPage > 0 ? totalPage : 1) : prev));
    }
  };


  const startIndex = (currentPage - 1) * pageSize;
  const currentCustomers = filtered.slice(startIndex, startIndex + pageSize);

  return (
    <div className="p-6 max-w-3xl mx-auto border rounded-lg shadow">
      <h2 className="text-xl font-bold mb-4">Quản Lý Từ Vựng</h2>

      <form onSubmit={handleSubmit} className="grid grid-cols-5 gap-2 mb-4">
        <Input value={vietnameseVocabulary} onChange={(e) => setVietnameseVocabulary(e.target.value)} placeholder="Từ Tiếng Việt" />
        <Input value={englishVocabulary} onChange={(e) => sêtnglishVocabulary(e.target.value)} placeholder="Nghĩa Tiếng Anh " />
        <Button type="primary" htmlType="submit">{editingId ? "Cập nhật" : "Thêm"}</Button>
      </form>

      <Input
        placeholder="Tìm kiếm theo tên..."
        value={search}
        onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }}
        className="mb-2"
      />

      <table className="w-full border text-sm">
        <thead>
          <tr className="bg-gray-100">
            <th className="border px-2">Từ Tiếng Việt</th>
            <th className="border px-2">Nghĩa Tiếng Anh</th>
            <th className="border px-2">Hành động</th>
          </tr>
        </thead>
        <tbody>
          {currentCustomers.map((c) => (
            <tr key={c.id}>
              <td className="border px-2">{c.name}</td>
              <td className="border px-2">{c.email}</td>
              <td className="border px-2 flex gap-2 justify-center">
                <Pencil className="text-orange-500 cursor-pointer" onClick={() => handleEdit(c)} />
                <Trash2 className="text-red-500 cursor-pointer" onClick={() => handleDelete(c.id)} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {filtered.length > pageSize && (
        <Pagination
          className="mt-4"
          current={currentPage}
          pageSize={pageSize}
          total={filtered.length}
          onChange={(p) => setCurrentPage(p)}
        />
      )}
    </div>
  );
}
