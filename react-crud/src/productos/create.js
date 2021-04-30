import { useState } from "react"
import { Redirect } from "react-router";

export default function ProductoCreate() {
    const [title, setTitle] = useState("");
    const [image, setImagen] = useState("");
    const [redirect, setRedirect] = useState(false);
    function cambiarTitle(e) {
        setTitle(e.currentTarget.value);
    }
    function cambiarImagen(e) {
        setImagen(e.currentTarget.value);
    }
    function enviarFormulario(e) {
        e.preventDefault();
        fetch('http://localhost:8000/api/products', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                title,
                image
            })
        }).then(() => {
            setRedirect(true);
        });
    }
    if (redirect)
        return (
            <Redirect to="/productos" />
        )
    return (
        <div className="m-3 card">
            <form onSubmit={enviarFormulario} className="card-body" action="http://localhost:8000/api/products" method="post">
                <div className="row">
                    <div className="col-md-6">
                        <input className="form-control" onChange={cambiarTitle} value={title} type="text" name="title" id="title" />
                    </div>
                    <div className="col-md-6">
                        <input className="form-control" onChange={cambiarImagen} value={image} type="text" name="image" id="image" />
                    </div>
                </div>
                <div className="row mt-3">
                    <div className="col-md-6 right"><button className="btn btn-primary" type="submit">Crear</button></div>
                </div>
            </form>
        </div>
    )
}