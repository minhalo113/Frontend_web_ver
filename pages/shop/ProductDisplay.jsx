import React from 'react'
import { useState } from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';
import Rating from '../../components/Rating';
import { useCart } from '../../context/CartContext';
import {toast} from "react-hot-toast"

const desc = "This is the detail of the product."


const ProductDisplay = ({item}) => {
    const {name, _id, price, discount, seller, reviewCount, images, stock, description, averageRating, colors = [], colorImages = [], types = [], sizes = []} = item || {}
    const discountedPrice = (price - (price * discount) / 100).toFixed(2)

    const [prequantity, setQuantity] = useState(1);
    const [selectedColor, setSelectedColor] = useState(colors[0] || '');
    const [selectedSize, setSelectedSize] = useState(sizes[0] || '')
    const {add} = useCart();

    const handleDecrease = () => {
        if(prequantity > 1){
            setQuantity(prequantity - 1)
        }
    }

    const handleIncrease = () =>{
        setQuantity(prequantity + 1)
    }

    const handleSubmit = (e) => {
        const product = {
            id: _id,
            img: images,
            name: name,
            price: price,
            discount: discount,
            color: selectedColor,
            size: selectedSize
        }

        e.preventDefault();
        add(product, prequantity)

        toast.success(
            `${prequantity} × ${name} added to cart`,
            { duration: 2500 }     
        );
    }

  return (
    <div>
        <div>
            <h4>{name}</h4>
            <Rating rating={averageRating} number_of_ratings={reviewCount}/>
            <h4>
                {
                    discount > 0 ? (
                        <>
                            ${discountedPrice}{``}
                            <del className='text-sm text-gray-500 ml-1'>${price}</del>
                        </>
                    ) : (
                        `$${price}`
                    )
                }
            </h4>
            <h6>{seller}</h6>
            {/* <p style={{ whiteSpace: 'pre-line' }}>{description}</p> */}
        </div>

        <div>
            <form onSubmit={handleSubmit}>

                <div className="flex items-center gap-6">
                    {colorImages.length > 0 ? (
                        <div className="flex gap-2">
                            {colorImages.map((img,i) => (
                                <img key={i} src={img} onClick={() => setSelectedColor(colors[i] || '')} className={`w-8 h-8 border ${selectedColor === colors[i] ? 'border-black' : 'border-gray-300'} cursor-pointer`} />
                            ))}
                        </div>
                    ) : (
                        colors.length > 0 && (
                            <select value={selectedColor} onChange={(e) => setSelectedColor(e.target.value)} className="border border-slate-300 rounded px-2 py-1">
                                {colors.map(c => (
                                    <option key={c} value={c}>{c}</option>
                                ))}
                            </select>
                        )
                    )}

                    {sizes.length > 0 && (
                        <select value={selectedSize} onChange={(e) => setSelectedSize(e.target.value)} className="border border-slate-300 rounded px-2 py-1">
                            {sizes.map(s => (
                                <option key={s} value={s}>{s}</option>
                            ))}
                        </select>
                    )}
                    <div className="cart-plus-minus">
                        <div className="dec qtybutton" onClick={handleDecrease}>-</div>
                        <input
                        className="cart-plus-minus-box"
                        type="text"
                        name="qtybutton"
                        id="qtybutton"
                        value={prequantity}
                        onChange={(e) => setQuantity(parseInt(e.target.value, 10))}
                        />
                        <div className="inc qtybutton" onClick={handleIncrease}>+</div>
                    </div>

                    {/* Stock display */}
                    {/* {stock !== undefined && (
                        <div className="flex items-center gap-4 text-lg text-gray-800">
                        <i className="icofont-box text-3xl text-[#D09A40]" />
                        <span>
                            {stock > 10 ? (
                            <span className="text-green-600 font-semibold">In Stock: {stock} items</span>
                            ) : stock > 0 ? (
                            <span className="text-orange-500 font-bold">Hurry! Only {stock} left</span>
                            ) : (
                            <span className="text-red-600 font-extrabold">Out of stock</span>
                            )}
                        </span>
                        </div>
                    )} */}
                 </div>

                <div style= {{display: "flex", justifyContent: "space-between", width: "100%" }}>
                    <button type = "submit" className='lab-btn'>
                        <span>Add to Cart</span>
                    </button>
                    <Link href = "/cart-page" className='lab-btn bg-primary'>
                        <span>Check Out</span>
                    </Link>
                </div>
            </form>
        </div>

    </div>
  )
}

ProductDisplay.propTypes = {
    item: PropTypes.shape({
        id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
        name: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        seller: PropTypes.string.isRequired,
        ratingsCount: PropTypes.number.isRequired,
        quantity: PropTypes.number.isRequired,
        images: PropTypes.oneOfType([PropTypes.string, PropTypes.array]).isRequired,
        colors: PropTypes.array,
        colorImages: PropTypes.array,
        types: PropTypes.array,
        sizes: PropTypes.array
    }).isRequired,
};

export default ProductDisplay