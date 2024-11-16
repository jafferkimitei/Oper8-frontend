
import Layout from "../components/Layout";
import ViewBalance from "../components/ViewBalance";

const Balances = () => {
  return (
    <Layout>
      <h1 className="text-3xl font-bold mb-2">Balances Management</h1>
      <ViewBalance />
    </Layout>
  );
};

export default Balances;
