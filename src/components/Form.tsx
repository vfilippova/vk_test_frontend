import React, { useState } from "react";
import axios from "axios";

const API_URL = "http://localhost:3001/data";

interface FormProps {
    onAdd: () => void;
}

export const Form: React.FC<FormProps> = ({ onAdd }) => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        age: "",
        city: "",
        country: "",
    });

    const [errors, setErrors] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const validate = () => {
        const { name, email, age, city, country } = formData;

        if (!name || !email || !age || !city || !country) {
            return "Все поля обязательны для заполнения.";
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return "Некорректный email.";
        }

        const ageNum = parseInt(age, 10);
        if (isNaN(ageNum) || ageNum < 1 || ageNum > 100) {
            return "Возраст должен быть числом от 1 до 100.";
        }

        return null;
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const validationError = validate();
        if (validationError) {
            setErrors(validationError);
            return;
        }

        setErrors(null);
        setLoading(true);
        try {
            await axios.post(API_URL, formData);
            setFormData({ name: "", email: "", age: "", city: "", country: "" });
            onAdd();
        } catch (e) {
            setErrors("Ошибка при добавлении записи.");
        }
        setLoading(false);
    };

    return (
        <form onSubmit={handleSubmit} className="mb-4 space-y-2">
            {Object.keys(formData).map((key) => (
                <input
                    key={key}
                    name={key}
                    value={(formData as any)[key]}
                    onChange={handleChange}
                    required
                    placeholder={key}
                    className="border p-2 w-full"
                />
            ))}
            {errors && <div className="text-red-600">{errors}</div>}
            <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2"
                disabled={loading}
            >
                {loading ? "Saving..." : "Add Record"}
            </button>
        </form>
    );
};
