import { getLocationService } from '@/services/get-location';
import { ChevronDown, LandPlot, MapPin } from 'lucide-react';
import { useEffect, useState } from 'react';

export function CityAreaSelector({
    profile,
    setProfile,
}: {
    profile: any;
    setProfile: (profile: any) => void;
}) {
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

                if (profile.city) {
                    const selectedCity = data.find((city: { cityName: string; areas: string[] }) => city.cityName === profile.city);
                    setAreas(selectedCity?.areas || []);
                }
            } catch (error) {
                console.error('Failed to fetch locations', error);
            }
        };

        fetchLocations();
    }, [profile.city]);

    const handleCityChange = (cityName: string) => {
        const selectedCity = locationData.find((city) => city.cityName === cityName);
        setProfile({ ...profile, city: cityName, area: '' });
        setAreas(selectedCity?.areas || []);
    };

    return (
        <>
            {/* City Select */}
            <div className="relative mb-4">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Your City
                </label>
                <div className="relative">
                    <MapPin className="absolute top-2.5 left-2.5 text-gray-400 pointer-events-none" />
                    <select
                        className="appearance-none block w-full rounded-lg border border-gray-300 dark:border-gray-600
              bg-white dark:bg-gray-700 text-gray-900 dark:text-white
              focus:ring-2 focus:ring-primary-500 focus:border-primary-500
              dark:focus:ring-primary-500 dark:focus:border-primary-500
              pl-10 pr-10 py-2"
                        value={profile.city || ''}
                        onChange={(e) => handleCityChange(e.target.value)}
                    >
                        <option value="">Select a city</option>
                        {locationData.map((city) => (
                            <option key={city.id} value={city.cityName}>
                                {city.cityName}
                            </option>
                        ))}
                    </select>
                    <ChevronDown className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                </div>
            </div>

            {/* Area Select */}
            <div className="relative">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Your Area
                </label>
                <div className="relative">
                    <LandPlot className="absolute top-2.5 left-2.5 text-gray-400 pointer-events-none" />
                    <select
                        className="appearance-none block w-full rounded-lg border border-gray-300 dark:border-gray-600
              bg-white dark:bg-gray-700 text-gray-900 dark:text-white
              focus:ring-2 focus:ring-primary-500 focus:border-primary-500
              dark:focus:ring-primary-500 dark:focus:border-primary-500
              pl-10 pr-10 py-2"
                        value={profile.area || ''}
                        onChange={(e) => setProfile({ ...profile, area: e.target.value })}
                        disabled={!profile.city}
                    >
                        <option value="">Select an area</option>
                        {areas.map((area) => (
                            <option key={area.id} value={area.name}>
                                {area.name}
                            </option>
                        ))}
                    </select>
                    <ChevronDown className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                </div>
            </div>
        </>
    );
}
