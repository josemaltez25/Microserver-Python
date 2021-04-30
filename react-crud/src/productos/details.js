import { useEffect, useState } from "react";
import { useParams } from "react-router";

export default function ProductoDetails() {
    const params = useParams();
    const [producto, setProducto] = useState();
    useEffect(() => {
        if (producto !== undefined) return;
        (async () => {
            setProducto(
                await (await fetch(`http://127.0.0.1:8000/api/products/${params.id}`)).json()
            );
        })();
    })
    if (producto === undefined) return (
        <div className="card"></div>
    )
    return (
        <div className="card">
            <div className="card-body">
                <div className="card-title">
                    <h4 className="text-center">
                        Producto
                    </h4>
                </div>
                <form className="row" action="http://localhost:8000/api/products" method="post">
                    <div className="col-md-6 mb-3">
                        <label htmlFor="id" className="control-label">Id:</label>
                        <input className="form-control" readOnly={true} defaultValue={producto.id} type="text" name="id" id="id" />
                    </div>
                    <div className="col-md-6 mb-3">
                        <label htmlFor="title" className="control-label">Title:</label>
                        <input className="form-control"readOnly={true}  defaultValue={producto.title} type="text" name="title" id="title" />
                    </div>
                    <div className="col-md-6 mb-3">
                        <label htmlFor="image" className="control-label">Imagen:</label>
                        <input className="form-control"readOnly={true}  defaultValue={producto.image} type="text" name="image" id="image" />
                    </div>
                    <div className="col-md-6 mb-3">
                        <label htmlFor="likes" className="control-label">Likes:</label>
                        <input className="form-control"readOnly={true}  defaultValue={producto.likes} type="text" name="likes" id="likes" />
                    </div>
                </form>
            </div>
        </div>
    );
}