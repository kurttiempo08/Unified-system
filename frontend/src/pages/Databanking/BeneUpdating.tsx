import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import ComponentCard from "../../components/common/ComponentCard";
import PageMeta from "../../components/common/PageMeta";
import BeneTable from "../../components/tables/BasicTables/BeneTable";

export default function BeneUpdating() {
  return (
    <>
      <PageMeta
        title="React.js Basic Tables Dashboard | TailAdmin - Next.js Admin Dashboard Template"
        description="This is React.js Basic Tables Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
      />
      <PageBreadcrumb pageTitle="Beneficiary Updating" />
      <div className="space-y-6">
        <ComponentCard title="Beneficiary Table">
          <BeneTable />
        </ComponentCard>
      </div>
    </>
  );
}
