-- phpMyAdmin SQL Dump
-- version 5.1.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Waktu pembuatan: 03 Jan 2023 pada 07.21
-- Versi server: 10.4.18-MariaDB
-- Versi PHP: 7.3.27

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `cheapfood`
--

-- --------------------------------------------------------

--
-- Struktur dari tabel `input_harga`
--

CREATE TABLE `input_harga` (
  `input_harga` int(11) NOT NULL,
  `masukan_harga` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Struktur dari tabel `login`
--

CREATE TABLE `login` (
  `login_email` varchar(20) NOT NULL,
  `email_userpembeli` varchar(20) NOT NULL,
  `email_userpedagang` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Struktur dari tabel `lokasi`
--

CREATE TABLE `lokasi` (
  `lokasi_id` varchar(20) NOT NULL,
  `nama_tempat` varchar(20) NOT NULL,
  `rute` varchar(20) NOT NULL,
  `makanan_id` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Struktur dari tabel `makanan`
--

CREATE TABLE `makanan` (
  `makanan_id` varchar(20) NOT NULL,
  `nama_makanan` varchar(20) NOT NULL,
  `input_harga` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Struktur dari tabel `registrasi`
--

CREATE TABLE `registrasi` (
  `regist_id` varchar(20) NOT NULL,
  `email_userpembeli` varchar(20) NOT NULL,
  `email_userpedagang` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Struktur dari tabel `user_pedagang`
--

CREATE TABLE `user_pedagang` (
  `email_userpedagang` varchar(20) NOT NULL,
  `username` varchar(20) NOT NULL,
  `password` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Struktur dari tabel `user_pembeli`
--

CREATE TABLE `user_pembeli` (
  `email_userpembeli` varchar(20) NOT NULL,
  `username` varchar(20) NOT NULL,
  `password` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `user_pembeli`
--

INSERT INTO `user_pembeli` (`email_userpembeli`, `username`, `password`) VALUES
('calvin@gmail.com', 'calvin', '1234'),
('galan@gmail.com ', 'Galan', '1234'),
('raisul@gmail.com', 'raisul', '15243u'),
('yanuar@gmail.com', 'yanuar', '157528');

-- --------------------------------------------------------

--
-- Struktur dari tabel `verifikasi`
--

CREATE TABLE `verifikasi` (
  `email_userpembeli` varchar(20) NOT NULL,
  `email_userpedagang` varchar(20) NOT NULL,
  `verifikasi_id` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Indexes for dumped tables
--

--
-- Indeks untuk tabel `input_harga`
--
ALTER TABLE `input_harga`
  ADD PRIMARY KEY (`input_harga`);

--
-- Indeks untuk tabel `login`
--
ALTER TABLE `login`
  ADD PRIMARY KEY (`login_email`),
  ADD KEY `fk_emailpembeli` (`email_userpembeli`),
  ADD KEY `fk_emailpedagang` (`email_userpedagang`);

--
-- Indeks untuk tabel `lokasi`
--
ALTER TABLE `lokasi`
  ADD PRIMARY KEY (`lokasi_id`),
  ADD KEY `FOREIGN KEY` (`makanan_id`);

--
-- Indeks untuk tabel `makanan`
--
ALTER TABLE `makanan`
  ADD PRIMARY KEY (`makanan_id`),
  ADD KEY `fk_inputharga` (`input_harga`);

--
-- Indeks untuk tabel `registrasi`
--
ALTER TABLE `registrasi`
  ADD PRIMARY KEY (`regist_id`),
  ADD KEY `fk_emailpedagang` (`email_userpedagang`),
  ADD KEY `fk_emailpembeli` (`email_userpembeli`);

--
-- Indeks untuk tabel `user_pedagang`
--
ALTER TABLE `user_pedagang`
  ADD PRIMARY KEY (`email_userpedagang`);

--
-- Indeks untuk tabel `user_pembeli`
--
ALTER TABLE `user_pembeli`
  ADD PRIMARY KEY (`email_userpembeli`);

--
-- Indeks untuk tabel `verifikasi`
--
ALTER TABLE `verifikasi`
  ADD PRIMARY KEY (`verifikasi_id`),
  ADD KEY `fk_emailpedagang` (`email_userpedagang`),
  ADD KEY `fk_emailpembeli` (`email_userpembeli`);

--
-- Ketidakleluasaan untuk tabel pelimpahan (Dumped Tables)
--

--
-- Ketidakleluasaan untuk tabel `login`
--
ALTER TABLE `login`
  ADD CONSTRAINT `login_ibfk_1` FOREIGN KEY (`email_userpembeli`) REFERENCES `user_pembeli` (`email_userpembeli`),
  ADD CONSTRAINT `login_ibfk_2` FOREIGN KEY (`email_userpedagang`) REFERENCES `user_pedagang` (`email_userpedagang`);

--
-- Ketidakleluasaan untuk tabel `lokasi`
--
ALTER TABLE `lokasi`
  ADD CONSTRAINT `FOREIGN KEY` FOREIGN KEY (`makanan_id`) REFERENCES `makanan` (`makanan_id`);

--
-- Ketidakleluasaan untuk tabel `registrasi`
--
ALTER TABLE `registrasi`
  ADD CONSTRAINT `registrasi_ibfk_1` FOREIGN KEY (`email_userpedagang`) REFERENCES `user_pedagang` (`email_userpedagang`),
  ADD CONSTRAINT `registrasi_ibfk_2` FOREIGN KEY (`email_userpembeli`) REFERENCES `user_pembeli` (`email_userpembeli`);

--
-- Ketidakleluasaan untuk tabel `verifikasi`
--
ALTER TABLE `verifikasi`
  ADD CONSTRAINT `verifikasi_ibfk_1` FOREIGN KEY (`email_userpedagang`) REFERENCES `user_pedagang` (`email_userpedagang`),
  ADD CONSTRAINT `verifikasi_ibfk_2` FOREIGN KEY (`email_userpembeli`) REFERENCES `user_pembeli` (`email_userpembeli`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
