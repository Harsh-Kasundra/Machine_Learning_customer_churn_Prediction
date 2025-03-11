import { useState } from "react";

export default function ChurnPredictor() {
    const [formData, setFormData] = useState({
        gender: "Female",
        SeniorCitizen: 0,
        Partner: "Yes",
        Dependents: "No",
        tenure: 1,
        PhoneService: "No",
        MultipleLines: "No phone service",
        InternetService: "DSL",
        OnlineSecurity: "No",
        OnlineBackup: "Yes",
        DeviceProtection: "No",
        TechSupport: "No",
        StreamingTV: "No",
        StreamingMovies: "No",
        Contract: "Month-to-month",
        PaperlessBilling: "Yes",
        PaymentMethod: "Electronic check",
        MonthlyCharges: 29.85,
        TotalCharges: 29.85,
    });

    const [loading, setLoading] = useState(false);
    const [prediction, setPrediction] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: name === "SeniorCitizen" ? parseInt(value) : value, // Convert SeniorCitizen to int
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await fetch("http://127.0.0.1:5000/predict", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            const result = await response.json();
            setPrediction(result.churn_prediction);
        } catch (error) {
            console.error("Error:", error);
        }
        setLoading(false);
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-[#6a6aac10] p-6">
            <div className="bg-[#6a6aac18] p-6 rounded-xl shadow-lg w-full max-w-4xl">
                <h2 className="text-xl font-semibold text-[#EAF2EF] mb-4">
                    📊 Churn Prediction
                </h2>

                <form
                    onSubmit={handleSubmit}
                    className="space-y-4 text-[#EAF2EF]"
                >
                    <div className="grid grid-cols-2 gap-4">
                        {/* Gender */}
                        <label className="text-sm">
                            Gender:
                            <select
                                name="gender"
                                onChange={handleChange}
                                value={formData.gender}
                                className="w-full border border-[#7654FF] rounded p-2"
                            >
                                <option value="Female">Female</option>
                                <option value="Male">Male</option>
                            </select>
                        </label>

                        {/* Senior Citizen */}
                        <label className="text-sm">
                            Senior Citizen:
                            <select
                                name="SeniorCitizen"
                                onChange={handleChange}
                                value={formData.SeniorCitizen}
                                className="w-full border border-[#7654FF] rounded p-2"
                            >
                                <option value={0}>No</option>
                                <option value={1}>Yes</option>
                            </select>
                        </label>

                        {/* Partner */}
                        <label className="text-sm">
                            Partner:
                            <select
                                name="Partner"
                                onChange={handleChange}
                                value={formData.Partner}
                                className="w-full border border-[#7654FF] rounded p-2"
                            >
                                <option value="Yes">Yes</option>
                                <option value="No">No</option>
                            </select>
                        </label>

                        {/* Dependents */}
                        <label className="text-sm">
                            Dependents:
                            <select
                                name="Dependents"
                                onChange={handleChange}
                                value={formData.Dependents}
                                className="w-full border border-[#7654FF] rounded p-2"
                            >
                                <option value="Yes">Yes</option>
                                <option value="No">No</option>
                            </select>
                        </label>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        {/* Phone Service */}
                        <label className="text-sm">
                            Phone Service:
                            <select
                                name="PhoneService"
                                onChange={handleChange}
                                value={formData.PhoneService}
                                className="w-full border border-[#7654FF] rounded p-2"
                            >
                                <option value="Yes">Yes</option>
                                <option value="No">No</option>
                            </select>
                        </label>

                        {/* Multiple Lines */}
                        <label className="text-sm">
                            Multiple Lines:
                            <select
                                name="MultipleLines"
                                onChange={handleChange}
                                value={formData.MultipleLines}
                                className="w-full border border-[#7654FF] rounded p-2"
                            >
                                <option value="No">No</option>
                                <option value="Yes">Yes</option>
                                <option value="No phone service">
                                    No phone service
                                </option>
                            </select>
                        </label>

                        {/* Internet Service */}
                        <label className="text-sm">
                            Internet Service:
                            <select
                                name="InternetService"
                                onChange={handleChange}
                                value={formData.InternetService}
                                className="w-full border border-[#7654FF] rounded p-2"
                            >
                                <option value="DSL">DSL</option>
                                <option value="Fiber optic">Fiber optic</option>
                                <option value="No">No</option>
                            </select>
                        </label>

                        {/* Online Security */}
                        <label className="text-sm">
                            Online Security:
                            <select
                                name="OnlineSecurity"
                                onChange={handleChange}
                                value={formData.OnlineSecurity}
                                className="w-full border border-[#7654FF] rounded p-2"
                            >
                                <option value="Yes">Yes</option>
                                <option value="No">No</option>
                                <option value="No internet service">
                                    No internet service
                                </option>
                            </select>
                        </label>
                    </div>

                    {/* More Features */}
                    <div className="grid grid-cols-2 gap-4">
                        <label className="text-sm">
                            Online Backup:
                            <select
                                name="OnlineBackup"
                                onChange={handleChange}
                                value={formData.OnlineBackup}
                                className="w-full border border-[#7654FF] rounded p-2"
                            >
                                <option value="Yes">Yes</option>
                                <option value="No">No</option>
                            </select>
                        </label>

                        <label className="text-sm">
                            Tech Support:
                            <select
                                name="TechSupport"
                                onChange={handleChange}
                                value={formData.TechSupport}
                                className="w-full border border-[#7654FF] rounded p-2"
                            >
                                <option value="Yes">Yes</option>
                                <option value="No">No</option>
                            </select>
                        </label>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <label className="text-sm">
                            Contract:
                            <select
                                name="Contract"
                                onChange={handleChange}
                                value={formData.Contract}
                                className="w-full border border-[#7654FF] rounded p-2"
                            >
                                <option value="Month-to-month">
                                    Month-to-month
                                </option>
                                <option value="One year">One year</option>
                                <option value="Two year">Two year</option>
                            </select>
                        </label>

                        <label className="text-sm">
                            Payment Method:
                            <select
                                name="PaymentMethod"
                                onChange={handleChange}
                                value={formData.PaymentMethod}
                                className="w-full border border-[#7654FF] rounded p-2"
                            >
                                <option value="Electronic check">
                                    Electronic check
                                </option>
                                <option value="Mailed check">
                                    Mailed check
                                </option>
                                <option value="Bank transfer (automatic)">
                                    Bank transfer (automatic)
                                </option>
                                <option value="Credit card (automatic)">
                                    Credit card (automatic)
                                </option>
                            </select>
                        </label>
                        <label className="text-sm">
                            Streaming TV:
                            <select
                                name="StreamingTV"
                                onChange={handleChange}
                                value={formData.StreamingTV}
                                className="w-full border border-[#7654FF] rounded p-2"
                            >
                                <option value="Yes">Yes</option>
                                <option value="No">No</option>
                                <option value="No internet service">
                                    No internet service
                                </option>
                            </select>
                        </label>
                        <label className="text-sm">
                            Streaming Movies:
                            <select
                                name="StreamingMovies"
                                onChange={handleChange}
                                value={formData.StreamingMovies}
                                className="w-full border border-[#7654FF] rounded p-2"
                            >
                                <option value="Yes">Yes</option>
                                <option value="No">No</option>
                                <option value="No internet service">
                                    No internet service
                                </option>
                            </select>
                        </label>
                        <label className="text-sm">
                            Device Protection:
                            <select
                                name="DeviceProtection"
                                onChange={handleChange}
                                value={formData.DeviceProtection}
                                className="w-full border border-[#7654FF] rounded p-2"
                            >
                                <option value="Yes">Yes</option>
                                <option value="No">No</option>
                                <option value="No internet service">
                                    No internet service
                                </option>
                            </select>
                        </label>
                        <label className="text-sm">
                            Paperless Billing:
                            <select
                                name="PaperlessBilling"
                                onChange={handleChange}
                                value={formData.PaperlessBilling}
                                className="w-full border border-[#7654FF] rounded p-2"
                            >
                                <option value="Yes">Yes</option>
                                <option value="No">No</option>
                            </select>
                        </label>
                        {/* Numeric Inputs */}
                        <label className="text-sm">
                            Monthly Charges:
                            <input
                                type="number"
                                name="MonthlyCharges"
                                value={formData.MonthlyCharges}
                                onChange={handleChange}
                                className="w-full border border-[#7654FF] rounded p-2"
                            />
                        </label>
                        <label className="text-sm">
                            Total Charges:
                            <input
                                type="number"
                                name="TotalCharges"
                                value={formData.TotalCharges}
                                onChange={handleChange}
                                className="w-full border border-[#7654FF] rounded p-2"
                            />
                        </label>
                    </div>

                    {/* Numeric Inputs */}
                    <label className="text-sm">
                        tenure:
                        <input
                            type="number"
                            name="tenure"
                            value={formData.tenure}
                            onChange={handleChange}
                            className="w-full border border-[#7654FF] rounded p-2"
                        />
                    </label>

                    <button
                        type="submit"
                        className="w-full bg-[#7654FF] text-white py-2 rounded-md mt-4"
                    >
                        {loading ? "Predicting..." : "Predict Churn"}
                    </button>
                </form>

                {prediction && (
                    <div
                        className={`mt-4 p-3 text-lg font-semibold rounded ${
                            prediction === "Yes"
                                ? "bg-red-500 text-white"
                                : "bg-green-500 text-white"
                        }`}
                    >
                        Prediction:{" "}
                        {prediction === "Yes"
                            ? "⚠️ High Churn Risk"
                            : "✅ No Churn Risk"}
                    </div>
                )}
            </div>
        </div>
    );
}
