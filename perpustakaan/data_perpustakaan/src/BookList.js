import React, { useState, useEffect } from 'react';
import axios from 'axios';

const BooksList = () => {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [newBook, setNewBook] = useState({
        judul: '',
        penulis: '',
        penerbit: '',
        tahun_terbit: '',
        jumlah_halaman: '',
        genre: ''
    });

    // Mengambil data buku dari API
    useEffect(() => {
        fetchBooks();
    }, []);

    const fetchBooks = () => {
        axios.get('http://localhost:8000/api/books')
            .then((response) => {
                setBooks(response.data.data);
                setLoading(false);
            })
            .catch((error) => {
                console.error('Ada error:', error);
                setLoading(false);
            });
    };

    // Fungsi untuk menambahkan buku
    const handleAddBook = (e) => {
        e.preventDefault();
        axios.post('http://localhost:8000/api/books', newBook)
            .then((response) => {
                fetchBooks(); // Refresh data setelah menambah buku
                setNewBook({
                    judul: '',
                    penulis: '',
                    penerbit: '',
                    tahun_terbit: '',
                    jumlah_halaman: '',
                    genre: ''
                });
            })
            .catch((error) => {
                console.error('Error menambah buku:', error);
            });
    };

    // Fungsi untuk menghapus buku
    const handleDeleteBook = (id) => {
        const confirmDelete = window.confirm('Apakah kamu yakin ingin menghapus buku ini?');
        if (confirmDelete) {
            axios.delete(`http://localhost:8000/api/books/${id}`)
                .then((response) => {
                    fetchBooks(); // Refresh data setelah menghapus buku
                    alert('Buku berhasil dihapus!');
                })
                .catch((error) => {
                    console.error('Error menghapus buku:', error);
                });
        }
    };

    // Jika masih loading
    if (loading) {
        return <div className="text-center">Loading...</div>;
    }

    return (
        <div className="container">
            <h1 className="text-center my-4">Daftar Buku</h1>

            {/* Form untuk menambah buku */}
            <div className="card mb-4">
                <div className="card-body">
                    <h5 className="card-title">Tambah Buku Baru</h5>
                    <form onSubmit={handleAddBook}>
                        <div className="form-group mb-2">
                            <label>Judul</label>
                            <input
                                type="text"
                                className="form-control"
                                value={newBook.judul}
                                onChange={(e) => setNewBook({ ...newBook, judul: e.target.value })}
                                required
                            />
                        </div>
                        <div className="form-group mb-2">
                            <label>Penulis</label>
                            <input
                                type="text"
                                className="form-control"
                                value={newBook.penulis}
                                onChange={(e) => setNewBook({ ...newBook, penulis: e.target.value })}
                                required
                            />
                        </div>
                        <div className="form-group mb-2">
                            <label>Penerbit</label>
                            <input
                                type="text"
                                className="form-control"
                                value={newBook.penerbit}
                                onChange={(e) => setNewBook({ ...newBook, penerbit: e.target.value })}
                                required
                            />
                        </div>
                        <div className="form-group mb-2">
                            <label>Tahun Terbit</label>
                            <input
                                type="number"
                                className="form-control"
                                value={newBook.tahun_terbit}
                                onChange={(e) => setNewBook({ ...newBook, tahun_terbit: e.target.value })}
                                required
                            />
                        </div>
                        <div className="form-group mb-2">
                            <label>Jumlah Halaman</label>
                            <input
                                type="number"
                                className="form-control"
                                value={newBook.jumlah_halaman}
                                onChange={(e) => setNewBook({ ...newBook, jumlah_halaman: e.target.value })}
                                required
                            />
                        </div>
                        <div className="form-group mb-2">
                            <label>Genre</label>
                            <input
                                type="text"
                                className="form-control"
                                value={newBook.genre}
                                onChange={(e) => setNewBook({ ...newBook, genre: e.target.value })}
                                required
                            />
                        </div>
                        <button type="submit" className="btn btn-primary">Tambah Buku</button>
                    </form>
                </div>
            </div>

            {/* Menampilkan daftar buku */}
            <div className="row">
                {books.map((book) => (
                    <div className="col-md-4 mb-3" key={book.id}>
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">{book.judul}</h5>
                                <p className="card-text">
                                    Penulis: {book.penulis}<br />
                                    Penerbit: {book.penerbit}<br />
                                    Tahun Terbit: {book.tahun_terbit}<br />
                                    Jumlah Halaman: {book.jumlah_halaman}<br />
                                    Genre: {book.genre}
                                </p>
                                <button
                                    className="btn btn-danger"
                                    onClick={() => handleDeleteBook(book.id)}
                                >
                                    Hapus
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default BooksList;
