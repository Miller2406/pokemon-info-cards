import { generationList, typesList, sortList } from "@/utils/optionList";
import { useSearchForm } from "@/components/SearchForm";

const SearchForm = () => {
  const { fieldKeyword, fieldGeneration, fieldTypes, fieldSort } =
    useSearchForm();
  return (
    <form className="grid grid-cols-1 sm:grid-cols-4 gap-x-[20px]">
      <div>
        <label
          htmlFor="generation"
          className="block mb-2 text-mb font-medium text-white"
        >
          Generation
        </label>
        <select
          {...fieldGeneration}
          id="generation"
          className="bg-[#1F2937] capitalize border border-gray-300 text-white text-sm rounded-lg focus:ring-[#3965B4] focus:border-[#3965B4] block w-full p-2.5 "
        >
          {generationList.map((item, index) => (
            <option
              className="capitalize"
              key={`generation-key-${index}`}
              value={index}
            >
              {item.name}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label
          htmlFor="types"
          className="block mb-2 text-mb font-medium text-white"
        >
          Types
        </label>
        <select
          {...fieldTypes}
          id="types"
          className="bg-[#1F2937] capitalize border border-gray-300 text-white text-sm rounded-lg focus:ring-[#3965B4] focus:border-[#3965B4] block w-full p-2.5 "
        >
          {typesList.map((item, index) => (
            <option
              className="capitalize"
              key={`type-key-${index}`}
              value={index}
            >
              {item}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label
          htmlFor="sort"
          className="block mb-2 text-mb font-medium text-white"
        >
          Sort by
        </label>
        <select
          {...fieldSort}
          id="sort"
          className="bg-[#1F2937] capitalize border border-gray-300 text-white text-sm rounded-lg focus:ring-[#3965B4] focus:border-[#3965B4] block w-full p-2.5 "
        >
          {sortList.map((item, index) => (
            <option
              className="capitalize"
              key={`sort-key-${index}`}
              value={index}
            >
              {item}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label
          htmlFor="search"
          className="block mb-2 text-mb font-medium text-white"
        >
          Search
        </label>
        <input
          {...fieldKeyword}
          type="text"
          id="search"
          className="bg-[#1F2937] border border-gray-300 text-white text-sm rounded-lg focus:ring-[#3965B4] focus:border-[#3965B4] block w-full p-2.5 "
        />
      </div>
    </form>
  );
};

export default SearchForm;
