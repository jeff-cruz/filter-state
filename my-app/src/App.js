import './App.css';
import { useState } from "react";

function ProductCategoryRow({ category }) {
  return (
    <tr>
      <th colSpan="2">{category}</th>
    </tr>
  );
}

function ProductRow({ product }) {
  const name = product.stocked ? (
    product.name
  ) : (
    <span style={{ color: "red" }}>{product.name}</span>
  );

  return (
    <tr>
      <td>{name}</td>
      <td>{product.price}</td>
    </tr>
  );
}

function ProductTable({ products, filterText, inStockOnly }) {
  const rows = [];
  let lastCategory = null;

  products.forEach((product) => {
    if (product.name.toLowerCase().indexOf(filterText.toLowerCase()) === -1) {
      return;
    }
    if (inStockOnly && !product.stocked) {
      return;
    }
    if (product.category !== lastCategory) {
      rows.push(
        <ProductCategoryRow
          category={product.category}
          key={product.category}
        />
      );
    }
    rows.push(<ProductRow product={product} key={product.name} />);
    lastCategory = product.category;
  });
  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Price</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  );
}

function SearchBar({
  filterText,
  inStockOnly,
  onFilterTextChange,
  onInStockOnlyChange
}) {
  return (
    <>
      <form>
        <input
          type="text"
          value={filterText}
          onChange={(event) => onFilterTextChange(event.target.value)}
          placeholder="Search..."
        />
        <input
          type="checkbox"
          checked={inStockOnly}
          onChange={(event) => onInStockOnlyChange(event.target.checked)}
        />{" "}
        Only show products in stock
      </form>
    </>
  );
}

function FilterableProductTable({ products }) {
  const [filterText, setFilterText] = useState("");
  const [inStockOnly, setInStockOnly] = useState(false);

  return (
    <>
      <SearchBar
        filterText={filterText}
        inStockOnly={inStockOnly}
        onFilterTextChange={setFilterText}
        onInStockOnlyChange={setInStockOnly}
      />
      <ProductTable
        products={products}
        filterText={filterText}
        inStockOnly={inStockOnly}
      />
    </>
  );
}

const PRODUCTS = [
  {
    category: "Hat",
    price: "$30.00",
    stocked: true,
    name: "A-Frame LA Trucker"
  },
  {
    category: "Hat",
    price: "$35.99",
    stocked: true,
    name: "A-Frame SD Trucker"
  },
  { category: "Hat", price: "$39.99", stocked: false, name: "K-Frame LA MVP" },
  { category: "Hat", price: "$33.00", stocked: true, name: "K-Frame SD MVP" },
  { category: "Hat", price: "$14.99", stocked: false, name: "Top Spinner" },
  { category: "Shoes", price: "$69.99", stocked: true, name: "Flip Flops" },
  { category: "Shoes", price: "$75.00", stocked: false, name: "House Loafers" },
  { category: "Shoes", price: "$109.99", stocked: true, name: "Nike Cortez" },
  {
    category: "Shoes",
    price: "$125.00",
    stocked: false,
    name: "Off White New Balances"
  },
  {
    category: "Shoes",
    price: "Expensive af",
    stocked: true,
    name: "Jasmine's Crocs"
  }
];

export default function App() {
  return <FilterableProductTable products={PRODUCTS} />;
}
