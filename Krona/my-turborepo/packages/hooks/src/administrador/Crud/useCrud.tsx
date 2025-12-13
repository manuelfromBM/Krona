import { useState } from "react";
import { Alert } from "react-native";
// import {Servicios} from '@packages/types'

export type Servicios = {
    id: string;
    name: string;
    price: number;
    image: string;
};

export type ServiciosCrudHook = {
    servicios: Servicios[];
    modalVisible: boolean;
    editing: Servicios | null;
    form: { name: string; price: string; image: string };
    openCreate: () => void;
    openEdit: (p: Servicios) => void;
    saveServicio: () => void;
    confirmDelete: (id: string) => void;
    setForm: React.Dispatch<React.SetStateAction<{ name: string; price: string; image: string }>>;
};

export default function useServiciosCrud(initial: Servicios[] = []): ServiciosCrudHook {
    const [servicios, setServicios] = useState<Servicios[]>(
        initial.length
            ? initial
            : [
                {
                    id: "1",
                    name: "Degradados",
                    price: 10000,
                    image: "https://cdn2.hubspot.net/hubfs/2356021/spiky%201.jpg",
                },
                {
                    id: "p2",
                    name: "Corte de barba",
                    price: 15000,
                    image:
                        "https://www.shutterstock.com/image-photo/beard-styling-cut-close-cropped-600nw-675613801.jpg",
                },
            ]
    );

    const [modalVisible, setModalVisible] = useState(false);
    const [editing, setEditing] = useState<Servicios | null>(null);
    const [form, setForm] = useState({ name: "", price: "", image: "" });

    function openCreate() {
        setEditing(null);
        setForm({ name: "", price: "", image: "" });
        setModalVisible(true);
    }

    function openEdit(p: Servicios) {
        setEditing(p);
        setForm({ name: p.name, price: String(p.price), image: p.image });
        setModalVisible(true);
    }

    function saveServicio() {
        if (!form.name.trim() || !form.price) {
            Alert.alert("Validación", "Nombre y precio son obligatorios.");
            return;
        }

        if (editing) {
            setServicios((prev) =>
                prev.map((p) =>
                    p.id === editing.id
                        ? {
                            ...p,
                            name: form.name.trim(),
                            price: parseFloat(form.price),
                            image: form.image || p.image,
                        }
                        : p
                )
            );
        } else {
            const newServicio: Servicios = {
                id: "p" + Date.now(),
                name: form.name.trim(),
                price: parseFloat(form.price),
                image: form.image || "https://via.placeholder.com/300x200.png?text=Producto",
            };
            setServicios((prev) => [newServicio, ...prev]);
        }

        setModalVisible(false);
    }

    function confirmDelete(id: string) {
        Alert.alert("Eliminar servicio", "¿Seguro que deseas eliminar este servicio?", [
            { text: "Cancelar", style: "cancel" },
            {
                text: "Eliminar",
                style: "destructive",
                onPress: () => setServicios((prev) => prev.filter((p) => p.id !== id)),
            },
        ]);
    }

    return {
        servicios,
        modalVisible,
        editing,
        form,
        openCreate,
        openEdit,
        saveServicio,
        confirmDelete,
        setForm,
    };
}