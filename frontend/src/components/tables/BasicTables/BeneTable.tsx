import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../../ui/table";
import Button from "../../ui/button/Button";
import { FileIcon } from "../../../icons";
import Modal from "../../modal/Modal";

interface Bene {
  roster_id: number;
  HOUSEHOLD_ID: string;
  FIRST_NAME: string;
  LAST_NAME: string;
  MID_NAME: string;
  EXT_NAME: string;
}


export default function BasicTableOne() {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [selectedBene, setSelectedBene] = useState<Bene | null>(null);
  const [beneData, setBeneData] = useState<Bene[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [searchHHID, setSearchHHID] = useState("");

  const handleOpenModal = (bene: Bene) => {
    setSelectedBene({ ...bene }); // clone to allow editing
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedBene(null);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (!selectedBene) return;
    setSelectedBene({
      ...selectedBene,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = async () => {
  if (!selectedBene) return;

  try {
    await fetch(
      `http://localhost:8000/api/beneficiaries/${selectedBene.roster_id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(selectedBene),
      }
    );

    // Update table data locally
    setBeneData((prev) =>
      prev.map((b) =>
        b.roster_id === selectedBene.roster_id ? selectedBene : b
      )
    );

    handleCloseModal();
  } catch (error) {
    console.error("Update failed:", error);
  }
};

  useEffect(() => {
    fetch("http://localhost:8000/api/beneficiaries")
      .then((res) => res.json())
      .then((data: Bene[]) => setBeneData(data))
      .catch((err) => console.error(err));
  }, []);

    // 🔍 Filter logic
  const filteredData = beneData.filter((bene) =>
    bene.HOUSEHOLD_ID.toLowerCase().includes(searchHHID.toLowerCase())
  );

// useEffect(() => {
//     const fetchBeneficiaries = async () => {
//       try {
//         const response = await fetch(
//           "http://localhost:8000/api/beneficiaries"
//         );

//         if (!response.ok) {
//           throw new Error("Failed to fetch beneficiaries");
//         }

//         const data: Bene[] = await response.json();
//         setBeneData(data);
//       } catch (err) {
//         setError("Unable to load data");
//         console.error(err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchBeneficiaries();
//   }, []);


  return (
    <>
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
        <div className="max-w-full overflow-x-auto">
          <div className="flex justify-end p-4">
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Search HHID..."
                value={searchHHID}
                onChange={(e) => setSearchHHID(e.target.value)}
                className="w-64 rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <Button size="sm" variant="primary">
                Search
              </Button>
            </div>
          </div>
        {!loading && !error && (
          <Table>
            {/* Table Header */}
            <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
              <TableRow>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  HHID
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Firstname
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Lastname
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Middlename
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Ext. Name
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Action
                </TableCell>
              </TableRow>
            </TableHeader>

            {/* Table Body */}
            <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
            {loading && (
              <div className="p-4 text-sm text-gray-500 dark:text-gray-400">
                Loading data...
              </div>
            )}

            {error && (
              <div className="p-4 text-red-500 text-sm">{error}</div>
            )}

              {filteredData.map((bene) => (
                <TableRow key={bene.roster_id}>
                  <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                    {bene.HOUSEHOLD_ID}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                    {bene.FIRST_NAME}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                    {bene.LAST_NAME}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                    {bene.MID_NAME}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                    {bene.EXT_NAME}
                  </TableCell>
                  <TableCell className="px-4 py-2 text-gray-500 text-theme-sm dark:text-gray-400">
                    <Button
                      size="sm"
                      variant="primary"
                      onClick={() => handleOpenModal(bene)}
                    >
                      <FileIcon className="mr-1" />
                      Update
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          )}
        </div>
      </div>

      {/* Modal */}
       <Modal isOpen={openModal} onClose={handleCloseModal}>
        {selectedBene && (
          <>
            <h2 className="mb-4 text-xl font-semibold text-black dark:text-white">
              Update Beneficiary
            </h2>

            <div className="grid grid-cols-1 gap-4">
              <div>
                <label className="mb-1 block text-sm text-gray-600 dark:text-gray-300">
                  HHID : {selectedBene.HOUSEHOLD_ID}
                </label>
                <input
                  value={selectedBene.HOUSEHOLD_ID}
                  disabled
                  className="w-full rounded border border-gray-300 bg-gray-100 px-3 py-2 text-sm dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm text-gray-600 dark:text-gray-300">
                  Fullname: {selectedBene.FIRST_NAME} {selectedBene.MID_NAME} {selectedBene.LAST_NAME} {selectedBene.EXT_NAME}
                </label>
                <input
                  name="firstname"
                  value={selectedBene.FIRST_NAME}
                  onChange={handleChange}
                  className="w-full rounded border border-gray-300 px-3 py-2 text-sm dark:border-gray-600 dark:bg-boxdark dark:text-white"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm text-gray-600 dark:text-gray-300">
                  Middlename
                </label>
                <input
                  name="middlename"
                  value={selectedBene.MID_NAME}
                  onChange={handleChange}
                  className="w-full rounded border border-gray-300 px-3 py-2 text-sm dark:border-gray-600 dark:bg-boxdark dark:text-white"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm text-gray-600 dark:text-gray-300">
                  Lastname
                </label>
                <input
                  name="lastname"
                  value={selectedBene.LAST_NAME}
                  onChange={handleChange}
                  className="w-full rounded border border-gray-300 px-3 py-2 text-sm dark:border-gray-600 dark:bg-boxdark dark:text-white"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm text-gray-600 dark:text-gray-300">
                  Ext. Name
                </label>
                <input
                  name="ext_name"
                  value={selectedBene.EXT_NAME}
                  onChange={handleChange}
                  className="w-full rounded border border-gray-300 px-3 py-2 text-sm dark:border-gray-600 dark:bg-boxdark dark:text-white"
                />
              </div>
            </div>

            <div className="mt-6 flex justify-end gap-2">
              <Button variant="outline" onClick={handleCloseModal}>
                Cancel
              </Button>
              <Button variant="primary" onClick={handleSave}>
                Save Changes
              </Button>
            </div>
          </>
        )}
      </Modal>
    </>
  );
}
