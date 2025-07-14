import { getLocationService } from '@/services/get-location';
import { ChevronDown, LandPlot, MapPin } from 'lucide-react';
import { useEffect, useState } from 'react';
import { FieldErrors, UseFormRegister, UseFormSetValue } from 'react-hook-form';

interface Props {
    city: string;
    area: string;
    setValue: UseFormSetValue<any>;
    register: UseFormRegister<any>;
    errors: FieldErrors<any>;
}

export function CityAreaSelector({ city, area, setValue, register, errors }: Props) {
    const [locationData, setLocationData] = useState<
        { id: string; cityName: string; areas: { id: string; name: string }[] }[]
    >([]);
    const [areas, setAreas] = useState<{ id: string; name: string }[]>([]);

    useEffect(() => {
        const fetchLocations = async () => {
            try {
                const response = await getLocationService();
                const data = response?.data?.data || [];
                setLocationData(data);

                if (city) {
                    const selectedCity = data.find((c: any) => c.cityName === city);
                    setAreas(selectedCity?.areas || []);
                }
            } catch (error) {
                console.error('Failed to fetch locations', error);
            }
        };

        fetchLocations();
    }, [city]);

    const handleCityChange = (value: string) => {
        setValue('city', value, { shouldValidate: true });
        setValue('area', '', { shouldValidate: true });

        const selected = locationData.find((c) => c.cityName === value);
        setAreas(selected?.areas || []);
    };

    return (
        <>
            {/* City Field */}
            <div className="relative mb-4">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Your City
                </label>
                <div className="relative">
                    <MapPin className="absolute top-2.5 left-2.5 text-gray-400 pointer-events-none" />
                    <select
                        {...register('city')}
                        value={city}
                        onChange={(e) => handleCityChange(e.target.value)}
                        className="appearance-none block w-full rounded-lg border border-gray-300 dark:border-gray-600
              bg-white dark:bg-gray-700 text-gray-900 dark:text-white
              focus:ring-2 focus:ring-primary-500 focus:border-primary-500
              dark:focus:ring-primary-500 dark:focus:border-primary-500
              pl-10 pr-10 py-2"
                    >
                        <option value="">Select a city</option>
                        {locationData.map((c) => (
                            <option key={c.id} value={c.cityName}>
                                {c.cityName}
                            </option>
                        ))}
                    </select>
                    <ChevronDown className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                    {errors.city?.message && <p className="absolute left-0 -bottom-5 text-xs text-red-500">{errors.city.message as string}</p>}
                </div>
            </div>

            {/* Area Field */}
            <div className="relative">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Your Area
                </label>
                <div className="relative">
                    <LandPlot className="absolute top-2.5 left-2.5 text-gray-400 pointer-events-none" />
                    <select
                        {...register('area')}
                        value={area}
                        onChange={(e) => setValue('area', e.target.value, { shouldValidate: true })}
                        disabled={!city}
                        className="appearance-none block w-full rounded-lg border border-gray-300 dark:border-gray-600
              bg-white dark:bg-gray-700 text-gray-900 dark:text-white
              focus:ring-2 focus:ring-primary-500 focus:border-primary-500
              dark:focus:ring-primary-500 dark:focus:border-primary-500
              pl-10 pr-10 py-2"
                    >
                        <option value="">Select an area</option>
                        {areas.map((a) => (
                            <option key={a.id} value={a.name}>
                                {a.name}
                            </option>
                        ))}
                    </select>
                    <ChevronDown className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                    {errors.area?.message && <p className="absolute left-0 -bottom-5 text-xs text-red-500">{errors.area.message as string}</p>}
                </div>
            </div>
        </>
    );
}
