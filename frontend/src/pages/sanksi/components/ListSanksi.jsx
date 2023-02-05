import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { RiEditBoxFill, RiDeleteBin2Fill, RiAlertFill } from "react-icons/ri";
import { FaSearch } from "react-icons/fa";
import { BsPlusLg } from "react-icons/bs";

const ListSanksi = () => {
  const [data, setData] = useState([]);
  const [alert, setAlert] = useState(false);
  const [uuid, setUuid] = useState("");
  const [search, setSearch] = useState("");
  const [newData, setNewData] = useState([]);

  useEffect(() => {
    if (search) {
      const filtData = data.filter((e) => e.name.includes(search));
      setNewData(filtData);
    } else {
      setNewData(data);
    }
  }, [search, data]);

  const getData = async () => {
    try {
      const response = await axios.get("http://localhost:5000/punishment");
      setData(response?.data);
    } catch (error) {
      console.log(error.response.msg);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const deleteData = (uuid) => {
    setAlert(true);
    setUuid(uuid);
  };
  const deleteAgree = async () => {
    await axios.delete(`http://localhost:5000/punishment/${uuid}`);
    setAlert(!alert);
    getData();
  };

  return (
    <div className="h-full overflow-auto">
      {/* Search & Button Add */}
      <div className="flex mt-5 justify-between">
        <div className="w-3/5 lg:w-1/3 relative">
          <input
            type="text"
            className="border-4 focus:border-sky-500 border-slate-400 outline-none rounded-2xl px-7 h-full w-full"
            placeholder="Cari..."
            onChange={(e) => setSearch(e.target.value)}
          />
          <FaSearch className="absolute right-5 top-4" color="#94a3b8" />
        </div>
        <Link
          to={"/sanksi/tambah"}
          className="p-4 bg-green-500 text-white font-bold rounded-lg lg:mr-10 hover:bg-green-400"
        >
          <BsPlusLg size={20} />
        </Link>
      </div>
      {/* Search & Button Add */}
      <div className={styles.tableContainer}>
        <div className={alert ? styles.alertOn : styles.alertOff}>
          <div className={styles.alertWrap}>
            <div className={styles.verifWrap}>
              <RiAlertFill size={60} color="#FF1E1E" />
              <h1 className={styles.alertVerif}>Apakah Anda Yakin ?</h1>
            </div>
            <div className={styles.alertButtonWrap}>
              <button
                onClick={() => setAlert(!alert)}
                className={styles.alertCancel}
              >
                Batal
              </button>
              <button onClick={deleteAgree} className={styles.alertDelete}>
                Hapus
              </button>
            </div>
          </div>
        </div>

        <table className={styles.tableWrap}>
          <thead>
            <tr>
              <th className={styles.tableTitle}>No.</th>
              <th className={styles.tableTitle}>Nama</th>
              <th className={styles.tableTitle}>Kategori</th>
              <th className={styles.tableTitle}>minWeight</th>
              <th className={styles.tableTitle}>maxWeight</th>
              <th className={styles.tableTitle}>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {newData &&
              newData.map((data, index) => (
                <tr key={data?.uuid}>
                  <td
                    className={
                      index % 2 === 0 ? styles.tableEven : styles.tableOdd
                    }
                  >
                    {index + 1}
                  </td>
                  <td
                    className={
                      index % 2 === 0 ? styles.tableEven : styles.tableOdd
                    }
                  >
                    {data?.name}
                  </td>
                  <td
                    className={
                      index % 2 === 0 ? styles.tableEven : styles.tableOdd
                    }
                  >
                    {data?.category}
                  </td>
                  <td
                    className={
                      index % 2 === 0 ? styles.tableEven : styles.tableOdd
                    }
                  >
                    {data?.minWeight}
                  </td>
                  <td
                    className={
                      index % 2 === 0 ? styles.tableEven : styles.tableOdd
                    }
                  >
                    {data?.maxWeight}
                  </td>
                  <td
                    className={
                      index % 2 === 0 ? styles.tableEven : styles.tableOdd
                    }
                  >
                    <div className={styles.tableButtonWrap}>
                      <Link to={`/sanksi/edit/${data.uuid}`}>
                        <RiEditBoxFill color="#354259 " className="w-7 h-7" />
                      </Link>
                      <button onClick={() => deleteData(data.uuid)}>
                        <RiDeleteBin2Fill color="#FF1E1E" className="w-7 h-7" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const styles = {
  tableContainer: "h-4/5 overflow-auto border border-slate-300 rounded-md mt-6",
  alertOn:
    "absolute h-full w-full bg-black flex items-center justify-center bg-opacity-40 z-50 top-0 left-0",
  alertOff: "hidden",
  alertWrap: "w-5/6 md:w-3/5 lg:w-1/3 bg-white rounded-xl py-6 px-6",
  verifWrap: "flex items-center gap-3",
  alertVerif: "font-bold",
  alertButtonWrap: "flex items-center gap-3 justify-end mt-7",
  alertCancel: "bg-sky-500 p-2 rounded-md text-white cursor-pointer",
  alertDelete: "bg-red-500 p-2 rounded-md text-white cursor-pointer",
  tableWrap: "w-full border-collapse table-auto",
  tableTitle:
    "border-b border-sky-500 py-3 px-7 text-start bg-sky-500 text-white",
  tableEven: "py-2 px-7",
  tableOdd: "bg-sky-100 py-2 px-7 brightness-95",
  tableButtonWrap: "flex gap-2",
};

export default ListSanksi;
