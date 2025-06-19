import { AccountNav } from "@/components/account/AccountNav";
import SettingsPage from "./settings/page";

export default function Page() {
    return (
        <>
            <div className=" max-md:hidden">
                <SettingsPage />
            </div>

            <div className="block">
                <h3 className=" font-semibold text-xl p-4 " >Profile</h3>
                <AccountNav />
            </div>
        </>
    )
}
