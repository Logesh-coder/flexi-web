import { AccountNav } from "@/components/account/AccountNav";
import SettingsPage from "./settings/page";

export default function Page() {
    return (
        <>
            <div className=" md:block">
                <SettingsPage />
            </div>

            {/* Mobile only */}
            <div className="block md: ">
                <h3 className=" font-semibold text-xl p-4 " >Profile</h3>
                <AccountNav />
            </div>
        </>
    )
}
