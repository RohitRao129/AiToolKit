import React from 'react'
import { Link } from 'react-router-dom'

export default function Footer() {
    return (<>
        <footer
            class="bg-light text-center text-lg-start position-fixed bottom-0 w-100">
            <div class="text-center p-3 " style={{background: "rgba(0, 0, 0, 0.2)",textDecoration :"none"}}>
                © 2020 Copyright:
                <Link class="text-dark" to="#" style={{textDecoration :"none"}}> auctionhub.com</Link>
            </div>
        </footer>
    </>
    )
            }
