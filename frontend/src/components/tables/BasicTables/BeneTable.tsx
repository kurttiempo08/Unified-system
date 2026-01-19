import { useState } from "react";
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
  id: number;
  hhid: string;
  firstname: string;
  lastname: string;
  middlename: string;
  ext_name: string;
}

// Define the table data using the interface
const beneData: Bene[] = [
  {
    id: 1,
    hhid: "100000-2561-561651",
    firstname: "Lebron",
    lastname: "James",
    middlename: "Bronny",
    ext_name: "Jr.",
  },
  {
    id: 2,
    hhid: "1000028-454-54654",
    firstname: "Kobe",
    lastname: "Bryant",
    middlename: "Booker",
    ext_name: "Sr.",
  },
];

export default function BasicTableOne() {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [selectedBene, setSelectedBene] = useState<Bene | null>(null);

  const handleOpenModal = (bene: Bene) => {
    setSelectedBene(bene);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedBene(null);
  };

  return (
    <>
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
        <div className="max-w-full overflow-x-auto">
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
              {beneData.map((bene) => (
                <TableRow key={bene.id}>
                  <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                    {bene.hhid}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                    {bene.firstname}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                    {bene.lastname}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                    {bene.middlename}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                    {bene.ext_name}
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
        </div>
      </div>

      {/* Modal */}
      <Modal isOpen={openModal} onClose={handleCloseModal}>
        {selectedBene && (
          <>
            <h2 className="mb-4 text-xl font-semibold text-black dark:text-white">
              Update Beneficiary
            </h2>

            <div className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
              <p>
                <strong>HHID:</strong> {selectedBene.hhid}
              </p>
              <p>
                <strong>Name:</strong>{" "}
                {selectedBene.firstname} {selectedBene.middlename}{" "}
                {selectedBene.lastname} {selectedBene.ext_name}
              </p>
            </div>

            <div className="mt-6 flex justify-end gap-2">
              <Button variant="outline" onClick={handleCloseModal}>
                Cancel
              </Button>
              <Button variant="primary">
                Save Changes
              </Button>
            </div>
          </>
        )}
      </Modal>
    </>
  );
}
