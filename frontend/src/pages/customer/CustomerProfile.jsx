import { useEffect, useState } from "react";

export default function CustomerProfile() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const storedUser = localStorage.getItem("user");

        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    if (!user) {
        return (
            <div className="p-6">
                <p className="text-slate-500">
                    Loading profile...
                </p>
            </div>
        );
    }

    return (
        <div className="p-6">

            <h1 className="text-3xl font-bold text-slate-900">
                My Profile
            </h1>

            <p className="text-slate-500 mt-2">
                Update your personal information.
            </p>

            <div className="bg-white rounded-2xl shadow mt-8 p-6">

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                    {/* Name */}
                    <div>
                        <p className="text-sm text-slate-500">
                            Full Name
                        </p>

                        <p className="text-lg font-semibold text-slate-900 mt-1">
                            {user.name || "Not available"}
                        </p>
                    </div>

                    {/* Email */}
                    <div>
                        <p className="text-sm text-slate-500">
                            Email
                        </p>

                        <p className="text-lg font-semibold text-slate-900 mt-1">
                            {user.email || "Not available"}
                        </p>
                    </div>

                    {/* Phone */}
                    <div>
                        <p className="text-sm text-slate-500">
                            Phone
                        </p>

                        <p className="text-lg font-semibold text-slate-900 mt-1">
                            {user.phone || "Not available"}
                        </p>
                    </div>

                    {/* Role */}
                    <div>
                        <p className="text-sm text-slate-500">
                            Role
                        </p>

                        <p className="text-lg font-semibold text-slate-900 mt-1 capitalize">
                            {user.role || "Customer"}
                        </p>
                    </div>

                </div>

            </div>

        </div>
    );
}