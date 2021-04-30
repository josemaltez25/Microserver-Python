import { useEffect, useState } from "react";
import ProductoCreate from './create';
import ProductoDetails from './details';
import { Link } from 'react-router-dom';
export {
    ProductoCreate,
    ProductoDetails
}

export default function Productos() {
    const [productos, setProductos] = useState();
    useEffect(() => {
        if (productos !== undefined) return;
        (async () => {
            setProductos(
                await (await fetch('http://localhost:8000/api/products')).json()
            );
        })();
    });
    async function del(e) {
        if (!window.confirm("Estas seguro?")) return;
        const id = e.currentTarget.getAttribute('data-id');
        await fetch(`http://localhost:8000/api/products/${id}`, {
            method: "DELETE"
        });
        setProductos(
            await (await fetch('http://localhost:8000/api/products')).json()
        )
    }
    async function like(e) {
        const id = e.currentTarget.getAttribute('data-id');
        await fetch(`http://localhost:5000/api/products/${id}/like`, {
            method: "POST"
        });
        setTimeout(async () => {
            setProductos(
                await (await fetch('http://localhost:8000/api/products')).json()
            )
        }, 1000)
    }
    return (
        <div className="card card-body">
            {(productos !== undefined) &&
                <table className="table table-stripped">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Titulo</th>
                            <th>Imagen</th>
                            <th>Likes</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {productos.map(producto => (
                            <tr key={`producto-${producto.id}`}>
                                <td>
                                    {producto.id}
                                </td>
                                <td>
                                    <Link to={`/productos/details/${producto.id}`}>
                                        {producto.title}
                                    </Link>
                                </td>
                                <td>
                                    <img width={50} height={50} src={producto.image} alt=""/>
                                </td>
                                <td>
                                    {producto.likes}
                                </td>
                                <td>
                                    <div className="btn-group" role="group">
                                        <Link className="btn btn-primary" to={`/productos/edit/${producto.id}`}>Editar</Link>
                                        <button onClick={del} data-id={producto.id} className="btn btn-primary">Destruir</button>
                                        <button onClick={like} data-id={producto.id} className="btn btn-success">Like</button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            }
        </div>
    );
}