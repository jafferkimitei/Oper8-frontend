
import Layout from "../components/Layout";
import ViewPayroll from "../components/ViewPayroll";

const Payrolls = () => {
  return (
    <Layout>
      <h1 className="text-3xl font-bold mb-2">Payroll Management</h1>
      <ViewPayroll />
    </Layout>
  );
};

export default Payrolls;
