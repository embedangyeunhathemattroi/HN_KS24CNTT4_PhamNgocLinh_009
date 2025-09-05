import React, { useState, useEffect } from "react";
import { Table, Button, Input, Modal, Pagination, message } from "antd";
import { PlusOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";

interface Vocab {
  id: string;
  english: string;
  vietnamese: string;
}

export default function VocabularyManager() {
  const [vocabs, setVocabs] = useState<Vocab[]>([]);
  const [english, setEnglish] = useState("");
  const [vietnamese, setVietnamese] = useState("");
  const [editing, setEditing] = useState<Vocab | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleting, setDeleting] = useState<Vocab | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem("vocabs");
    if (saved) setVocabs(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem("vocabs", JSON.stringify(vocabs));
  }, [vocabs]);

  const handleAdd = () => {
    if (!english.trim() || !vietnamese.trim()) {
      message.error("Không được để trống");
      return;
    }
    if (
      vocabs.some(
        (v) =>
          v.english.toLowerCase() === english.trim().toLowerCase() &&
          (!editing || v.id !== editing.id)
      )
    ) {
      message.error("Từ tiếng Anh đã tồn tại");
      return;
    }

    if (editing) {
      setVocabs((prev) =>
        prev.map((v) =>
          v.id === editing.id
            ? { ...v, english: english.trim(), vietnamese: vietnamese.trim() }
            : v
        )
      );
      setEditing(null);
      message.success("Cập nhật thành công");
    } else {
      setVocabs((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          english: english.trim(),
          vietnamese: vietnamese.trim(),
        },
      ]);
      message.success("Thêm thành công");
    }
    setEnglish("");
    setVietnamese("");
  };

  const handleEdit = (record: Vocab) => {
    setEditing(record);
    setEnglish(record.english);
    setVietnamese(record.vietnamese);
  };

  const confirmDelete = () => {
    if (deleting) {
      setVocabs((prev) => prev.filter((v) => v.id !== deleting.id));
      message.success("Xóa thành công");
    }
    setDeleting(null);
    setIsModalOpen(false);
  };

  const columns = [
    {
      title: "Từ tiếng Anh",
      dataIndex: "english",
    },
    {
      title: "Nghĩa tiếng Việt",
      dataIndex: "vietnamese",
    },
    {
      title: "Hành động",
      render: (_: any, record: Vocab) => (
        <div className="flex gap-2">
          <Button
            type="primary"
            icon={<EditOutlined />}
            onClick={() => handleEdit(record)}
          >
            Sửa
          </Button>
          <Button
            danger
            icon={<DeleteOutlined />}
            onClick={() => {
              setDeleting(record);
              setIsModalOpen(true);
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
      <h1 className="text-2xl font-bold text-center mb-4">
        📘 Quản Lý Từ Vựng
      </h1>
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
        <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd}>
          {editing ? "Lưu" : "Thêm"}
        </Button>
      </div>

      <Table
        rowKey="id"
        columns={columns}
        dataSource={vocabs}
        pagination={false}
      />

      <div className="flex justify-center mt-4">
        <Pagination current={1} total={50} pageSize={10} />
      </div>

      <Modal
        title="Xác nhận xóa"
        open={isModalOpen}
        onOk={confirmDelete}
        onCancel={() => setIsModalOpen(false)}
        okText="Xóa"
        cancelText="Hủy"
      >
        Bạn có chắc chắn muốn xóa từ này?
      </Modal>
    </div>
  );
}
