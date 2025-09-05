import React, { useState, useEffect } from "react";
import { Table, Button, Input, Modal, Pagination, message } from "antd";
import { PlusOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";

interface Word {
  id: string;
  english: string;
  vietnamese: string;
}

export default function VocabularyApp() {
  const [list, setList] = useState<Word[]>([]);
  const [english, setEnglish] = useState("");
  const [vietnamese, setVietnamese] = useState("");
  const [editWord, setEditWord] = useState<Word | null>(null);
  const [showDelete, setShowDelete] = useState(false);
  const [deleteWord, setDeleteWord] = useState<Word | null>(null);

  // dữ liệu mẫu ban đầu
  const sampleData: Word[] = [
    { id: "1", english: "apple", vietnamese: "quả táo" },
    { id: "2", english: "dog", vietnamese: "con chó" },
    { id: "3", english: "book", vietnamese: "quyển sách" },
  ];

  useEffect(() => {
    const saved = localStorage.getItem("words");
    if (saved) {
      setList(JSON.parse(saved));
    } else {
      localStorage.setItem("words", JSON.stringify(sampleData));
      setList(sampleData);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("words", JSON.stringify(list));
  }, [list]);

  const handleSave = () => {
    if (!english.trim() || !vietnamese.trim()) {
      message.error("Không được để trống");
      return;
    }
    if (
      list.some(
        (w) =>
          w.english.toLowerCase() === english.trim().toLowerCase() &&
          (!editWord || w.id !== editWord.id)
      )
    ) {
      message.error("Từ đã tồn tại");
      return;
    }
    if (editWord) {
      setList(
        list.map((w) =>
          w.id === editWord.id
            ? { ...w, english: english.trim(), vietnamese: vietnamese.trim() }
            : w
        )
      );
      setEditWord(null);
      message.success("Cập nhật thành công");
    } else {
      setList([
        ...list,
        { id: Date.now().toString(), english: english.trim(), vietnamese: vietnamese.trim() },
      ]);
      message.success("Thêm thành công");
    }
    setEnglish("");
    setVietnamese("");
  };

  const handleEdit = (w: Word) => {
    setEditWord(w);
    setEnglish(w.english);
    setVietnamese(w.vietnamese);
  };

  const handleDelete = () => {
    if (deleteWord) {
      setList(list.filter((w) => w.id !== deleteWord.id));
      message.success("Xóa thành công");
    }
    setShowDelete(false);
  };

  const columns = [
    { title: "Từ tiếng Anh", dataIndex: "english" },
    { title: "Nghĩa tiếng Việt", dataIndex: "vietnamese" },
    {
      title: "Hành động",
      render: (_: any, w: Word) => (
        <div className="flex gap-2">
          <Button type="primary" icon={<EditOutlined />} onClick={() => handleEdit(w)}>
            Sửa
          </Button>
          <Button
            danger
            icon={<DeleteOutlined />}
            onClick={() => {
              setDeleteWord(w);
              setShowDelete(true);
            }}
          >
            Xóa
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold text-center mb-4"> Quản Lý Từ Vựng</h1>
      <div className="flex gap-2 mb-4">
        <Input
          placeholder="Từ tiếng Anh"
          value={english}
          onChange={(e) => setEnglish(e.target.value)}
        />
        <Input
          placeholder="Nghĩa tiếng Việt"
          value={vietnamese}
          onChange={(e) => setVietnamese(e.target.value)}
        />
        <Button type="primary" icon={<PlusOutlined />} onClick={handleSave}>
          {editWord ? "Lưu" : "Thêm"}
        </Button>
      </div>

      <Table rowKey="id" columns={columns} dataSource={list} pagination={false} />

      <div className="flex justify-center mt-4">
        <Pagination current={1} total={list.length} pageSize={5} />
      </div>

      <Modal
        title="Xác nhận xóa"
        open={showDelete}
        onOk={handleDelete}
        onCancel={() => setShowDelete(false)}
        okText="Xóa"
        cancelText="Hủy"
      >
        Bạn có chắc chắn muốn xóa?
      </Modal>
    </div>
  );
}
