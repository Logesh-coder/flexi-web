import { getLocationService } from '@/services/get-location';
import { ChevronDown, SlidersHorizontal } from 'lucide-react';
import { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import Input from '../ui/Input';

interface JobFilterProps {
  filters: any;
  updateFilter: any;
  search: boolean;
  setSearch: React.Dispatch<React.SetStateAction<boolean>>;
  setMobileFilterOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  clearFilterListPage: boolean;
  setClearFilterListPage: any
}

export function JobFilters({ filters, updateFilter, search, setSearch, setMobileFilterOpen, clearFilterListPage, setClearFilterListPage }: JobFilterProps) {
  const [showCalendar, setShowCalendar] = useState(false);
  const [locations, setLocations] = useState([]);
  const [selectedCity, setSelectedCity] = useState<any>(null);
  const [localFilters, setLocalFilters] = useState(filters);

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const response = await getLocationService();
        setLocations(response?.data?.data || []);
      } catch (err: any) {
        console.error('Failed to fetch locations:', err);
      }
    };
    fetchLocations();
  }, []);

  useEffect(() => {
    setLocalFilters(filters);
  }, [filters]);

  const clearFilters = () => {
    const emptyFilters = {
      search: '',
      city: '',
      area: '',
      date: '',
      minBudget: '',
      maxBudget: '',
    };

    setLocalFilters(emptyFilters);
    Object.keys(emptyFilters).forEach((key) => updateFilter(key, ''));
    setSelectedCity(null);
    setSearch(!search);
  };

  useEffect(() => {
    if (clearFilterListPage) {
      const emptyFilters = {
        search: '',
        city: '',
        area: '',
        date: '',
        minBudget: '',
        maxBudget: '',
      };

      setLocalFilters(emptyFilters);
      Object.keys(emptyFilters).forEach((key) => updateFilter(key, ''));
      setSelectedCity(null);
      setSearch(!search);
      setClearFilterListPage(false)
    }
  }, [clearFilterListPage])

  const handleSearch = () => {
    Object.entries(localFilters).forEach(([key, value]) => updateFilter(key, value));
    setSearch(!search);
    if (setMobileFilterOpen) {
      setMobileFilterOpen(false);
    }
  };


  const isFilterApplied = localFilters &&
    Object.entries(localFilters).some(
      ([key, value]) => key !== 'search' && value !== ''
    );


  return (
    <div className="bg-white w-full dark:bg-gray-800 p-6 border dark:border-black border-gray-300 rounded-lg">
      <div className="flex items-center gap-2 mb-6">
        <SlidersHorizontal className="w-5 h-5 text-gray-600 dark:text-gray-400" />
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Filters</h2>
      </div>

      <div className="space-y-6">
        {/* City Dropdown */}
        <div className="relative">
          <select
            value={localFilters.city}
            onChange={(e) => {
              const cityName = e.target.value;
              const cityData = locations.find((loc: any) => loc.cityName === cityName);
              setSelectedCity(cityData);
              setLocalFilters((prev: any) => ({
                ...prev,
                city: cityName,
                area: '',
              }));
            }}
            className="w-full appearance-none border dark:border-black dark:bg-gray-700 rounded-lg px-3 py-[10px] pr-10 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 dark:focus:ring-primary-500 dark:focus:border-primary-500"
          >
            <option value="">Select a city</option>
            {locations.map((loc: any) => (
              <option key={loc.cityId} value={loc.cityName}>
                {loc.cityName}
              </option>
            ))}
          </select>
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-600 pointer-events-none" />
        </div>

        {/* Area Dropdown */}
        <div className="relative">
          <select
            value={localFilters.area}
            onChange={(e) =>
              setLocalFilters((prev: any) => ({
                ...prev,
                area: e.target.value,
              }))
            }
            disabled={!selectedCity}
            className="w-full appearance-none border dark:border-black dark:bg-gray-700 rounded-lg px-3 py-[10px] pr-10 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 dark:focus:ring-primary-500 dark:focus:border-primary-500"
          >
            <option value="">Select an area</option>
            {selectedCity?.areas?.map((area: any) => (
              <option key={area.id} value={area.name} className="capitalize">
                {area.name}
              </option>
            ))}
          </select>
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-600 pointer-events-none" />
        </div>

        {/* Date Picker */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Date
          </label>
          <div className="relative">
            <input
              readOnly
              value={localFilters.date}
              onClick={() => setShowCalendar((prev) => !prev)}
              placeholder="Select date"
              className="block w-full rounded-lg border dark:border-black bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-primary-500 dark:focus:ring-primary-500 dark:focus:border-primary-500 pr-10 py-2 p-2 placeholder:text-gray-500 dark:placeholder:text-gray-400"
            />
            {showCalendar && (
              <div className="absolute w-full z-50 mt-2 shadow-lg rounded-lg bg-white dark:bg-gray-800">
                <Calendar
                  onChange={(value) => {
                    if (value instanceof Date) {
                      const day = String(value.getDate()).padStart(2, '0');
                      const month = String(value.getMonth() + 1).padStart(2, '0');
                      const year = value.getFullYear();
                      const formatted = `${day}-${month}-${year}`;
                      setLocalFilters((prev: any) => ({
                        ...prev,
                        date: formatted,
                      }));
                      setShowCalendar(false);
                    }
                  }}
                  minDate={new Date()}
                  value={
                    localFilters.date
                      ? (() => {
                        const [day, month, year] = localFilters.date.split('-');
                        return new Date(`${year}-${month}-${day}`);
                      })()
                      : null
                  }
                  className="!w-full dark:!bg-black p-2 rounded-lg"
                />
              </div>
            )}
          </div>
        </div>

        {/* Budget Range */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Budget Range
          </label>
          <div className="grid grid-cols-2 gap-4">
            <Input
              placeholder="Min"
              value={localFilters.minBudget}
              onChange={(e) =>
                setLocalFilters((prev: any) => ({
                  ...prev,
                  minBudget: e.target.value,
                }))
              }
            />
            <Input
              placeholder="Max"
              value={localFilters.maxBudget}
              onChange={(e) =>
                setLocalFilters((prev: any) => ({
                  ...prev,
                  maxBudget: e.target.value,
                }))
              }
            />
          </div>
        </div>
      </div>

      {/* Clear Filter */}
      <button
        className="my-2 mt-4 text-end w-full capitalize text-sm hover:underline"
        onClick={clearFilters}
      >
        clear filter
      </button>

      {/* Search Button */}
      <div>
        <button
          onClick={handleSearch}
          disabled={!isFilterApplied}
          className={`w-full py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500
          ${isFilterApplied
              ? 'bg-primary-500 text-white hover:bg-primary-600'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }
          `}
        >
          Search
        </button>
      </div>
    </div>
  );
}
