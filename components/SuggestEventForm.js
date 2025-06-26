import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useState } from "react";

const schema = yup.object().shape({
    name: yup.string().required("Event name is required").min(3, "At least 3 characters"),
    description: yup.string().required("Description is required").min(10, "At least 10 characters"),
    date: yup.date().required("Date is required").min(new Date(), "Date must be in the future"),
    location: yup.string().required("Location is required").min(2, "At least 2 characters"),
});

export default function SuggestEventForm() {
    const [submitted, setSubmitted] = useState(false);
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm({
        resolver: yupResolver(schema),
    });

    const onSubmit = (data) => {
        setSubmitted(true);
        reset();
        setTimeout(() => setSubmitted(false), 3000);
    };

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="max-w-xl mx-auto bg-white rounded-lg shadow p-6 mt-10"
        >
            <h2 className="text-xl font-bold mb-4">Suggest a Charity Event</h2>
            <div className="mb-4">
                <label className="block mb-1 font-medium">Event Name</label>
                <input
                    type="text"
                    {...register("name")}
                    className="w-full border rounded p-2 focus:outline-none focus:ring"
                />
                {errors.name && (
                    <p className="text-red-600 text-sm mt-1">{errors.name.message}</p>
                )}
            </div>
            <div className="mb-4">
                <label className="block mb-1 font-medium">Description</label>
                <textarea
                    {...register("description")}
                    className="w-full border rounded p-2 focus:outline-none focus:ring"
                />
                {errors.description && (
                    <p className="text-red-600 text-sm mt-1">{errors.description.message}</p>
                )}
            </div>
            <div className="mb-4">
                <label className="block mb-1 font-medium">Date</label>
                <input
                    type="date"
                    {...register("date")}
                    className="w-full border rounded p-2 focus:outline-none focus:ring"
                />
                {errors.date && (
                    <p className="text-red-600 text-sm mt-1">{errors.date.message}</p>
                )}
            </div>
            <div className="mb-4">
                <label className="block mb-1 font-medium">Location</label>
                <input
                    type="text"
                    {...register("location")}
                    className="w-full border rounded p-2 focus:outline-none focus:ring"
                />
                {errors.location && (
                    <p className="text-red-600 text-sm mt-1">{errors.location.message}</p>
                )}
            </div>
            <button
                type="submit"
                disabled={isSubmitting}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
            >
                {isSubmitting ? "Submitting..." : "Submit"}
            </button>
            {submitted && (
                <div className="mt-4 text-green-600 font-semibold">Thank you! Your event suggestion has been submitted.</div>
            )}
        </form>
    );
} 