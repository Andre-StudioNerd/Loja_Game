import { useNavigate } from "react-router";
import ProductCard from "../../components/ProductCard/ProductCard";
import { useCategories, useProducts } from "../../context";
import SearchInput from "../../components/SearchInput/SearchInput";
import { useState } from "react";
import { useSearch } from "../../hooks/useSearch";

const Home = () => {
  const navigate = useNavigate();
  const { categories } = useCategories();
  const { products, setSelectedProduct } = useProducts();
  const { searchTerm, setSearchTerm, clearSearch, isValidSearch } = useSearch();

  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory
      ? product.category === selectedCategory
      : true;
    return matchesSearch && matchesCategory;
  });

  const handleCategoryClick = (categoryId: number) => {
    setSelectedCategory(selectedCategory === categoryId ? null : categoryId);
    clearSearch(); // Clear search when changing category
  };

  const handleClearFilters = () => {
    setSelectedCategory(null);
    clearSearch(); // Clear search when changing category
  };

  return (
    <div className="min-h-screen px-4 md:px-8 lg:px-16 py-8 pb-32">
      {/* Hero Section */}
      <div className="max-w-6xl mx-auto mb-16">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold orbitron-bold text-[#0B254B] text-center mb-6">
          Bem-vindo à UseDev
        </h1>
        <p className="text-base md:text-lg text-gray-600 text-center max-w-2xl mx-auto mb-8">
          De roupas a gadgets tecnológicos temos tudo para atender suas paixões
          e hobbies com estilo e autenticidade.
        </p>

        <div className="max-w-xl mx-auto">
          <SearchInput
            placeholder="Buscar produtos..."
            onSearch={setSearchTerm}
          />
        </div>
      </div>

      {/* Categories Section */}
      <div className="max-w-6xl mx-auto mb-16">
        <h2 className="text-2xl md:text-3xl font-bold orbitron-bold text-[#0B254B] text-center mb-8">
          Categorias
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category) => (
            <div
              key={category.id}
              className={`cursor-pointer p-4 rounded-lg transition-transform hover:scale-105 ${
                selectedCategory === category.id
                  ? "ring-4 ring-[#0B254B]"
                  : "border border-gray-200"
              }`}
              onClick={() => handleCategoryClick(category.id)}
            >
              <p className="text-2xl text-black orbitron-bold text-center">
                {category.name}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Products Section */}
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold orbitron-bold text-[#0B254B] text-center">
            Produtos
          </h2>
          {(selectedCategory || isValidSearch) && (
            <button
              onClick={handleClearFilters}
              className="text-[#0B254B] hover:text-[#0B254B]/80 transition-colors mt-4 md:mt-0"
            >
              Limpar filtros
            </button>
          )}
        </div>
        {filteredProducts.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
            <p className="text-2xl font-bold text-[#0B254B] mb-4">
              Nenhum produto encontrado
            </p>
            <p className="text-gray-600 mb-8">
              {isValidSearch
                ? `Não encontramos produtos que correspondam à sua busca "${searchTerm}"`
                : selectedCategory
                  ? "Não há produtos disponíveis nesta categoria"
                  : "Não há produtos disponíveis no momento"}
            </p>
            <button
              onClick={handleClearFilters}
              className="bg-[#0B254B] text-white px-6 py-3 rounded-lg hover:bg-[#0B254B]/90 transition-colors"
            >
              Limpar filtros
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onClick={() => {
                  setSelectedProduct(product);
                  navigate(`/product/${product.id}`);
                }}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
