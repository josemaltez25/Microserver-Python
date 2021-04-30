import { useEffect, useState } from "react";
import { useParams, Redirect } from "react-router-dom";

export default function ProductoEdit() {
    const params = useParams();
    const [producto, setProducto] = useState();
    const [redirect, setRedirect] = useState(false);
    useEffect(() => {
        if (producto !== undefined) return;
        (async () => {
            setProducto(
                await (await fetch(`http://localhost:8000/api/products/${params.id}`)).json()
            );
        })();
    });
    function cambiarTitle(e) {
        setProducto({ ...producto, title: e.currentTarget.value });
    }
    function cambiarImagen(e) {
        setProducto({ ...producto, image: e.currentTarget.value });
    }
    function enviarFormulario(e) {
        e.preventDefault();
        fetch(`http://localhost:8000/api/products/${producto.id}`, {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ title: producto.title, image: producto.image })
        }).then(() => {
            setRedirect(true);
        });
    }
    if (producto === undefined) return (
        <div className="card"></div>
    )
    if (redirect) return (
        <Redirect to="/productos" />
    )
    return (
        <div className="card">
            <div className="card-body">
                <div className="card-title">
                    <h4 className="text-center">
                        Producto
                    </h4>
                </div>
                <form onSubmit={enviarFormulario} className="row" action="http://localhost:8000/api/products" method="put">
                    <div className="col-md-6 mb-3">
                        <label htmlFor="id" className="control-label">Id:</label>
                        <input className="form-control" readOnly={true} defaultValue={producto.id} type="text" name="id" id="id" />
                    </div>
                    <div className="col-md-6 mb-3">
                        <label htmlFor="title" className="control-label">Title:</label>
                        <input className="form-control" onChange={cambiarTitle} value={producto.title} type="text" name="title" id="title" />
                    </div>
                    <div className="col-md-6 mb-3">
                        <label htmlFor="image" className="control-label">Imagen:</label>
                        <input className="form-control" onChange={cambiarImagen} value={producto.image} type="text" name="image" id="image" />
                    </div>
                    <div className="col-md-6 mb-3">
                        <label htmlFor="likes" className="control-label">Likes:</label>
                        <input className="form-control" readOnly={true} defaultValue={producto.likes} type="text" name="likes" id="likes" />
                    </div>
                    <div className="col-md-6"><button className="btn btn-primary" type="submit">Editar</button></div>
                </form>
            </div>
        </div>
    );
}