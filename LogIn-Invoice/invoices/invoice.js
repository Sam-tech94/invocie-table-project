


const url = "https://invoicesapi20210913135422.azurewebsites.net/products";
const quantData = "https://invoicesapi20210913135422.azurewebsites.net/invoicelines";
const invoicesUrl = 'https://invoicesapi20210913135422.azurewebsites.net/invoices';


function getProductInfo(invoiceLine, products) {
    //console.log(invoiceLine, products)
    let product = products.value.find(product => product.ProductId === invoiceLine.ProductId);
    return {
        total: product.Price * invoiceLine.Quantity,
        name: product.Name,
        price: product.Price
    };
}



async function getData(url, table) {
   try {
        const tableHead = table.querySelector("thead");
        const tableBody = table.querySelector("tbody");
        const tableInvoice = document.querySelector(".invoice-table");
        const invoiceHead = tableInvoice.querySelector("thead");
        const invoiceBody = tableInvoice.querySelector("tbody");
    
        const invoiceResponse = await fetch(invoicesUrl);
        let invoices = await invoiceResponse.json();
        
        const response = await fetch(url);
        let products = await response.json();

        const res = await fetch(quantData);
        let invoiceLines = await res.json();

        invoiceLines = invoiceLines.value.map(invoiceLine => {
            let product = getProductInfo(invoiceLine, products);
            invoiceLine.total = product.total;
            invoiceLine.name = product.name;
            invoiceLine.price = product.price
            return invoiceLine
        });

        invoices = invoices.value.map(invoice => {
            invoice.invoiceLines = invoiceLines.filter(invoiceLine => {
                if (invoice.InvoiceId === invoiceLine.InvoiceId) {
                    return invoiceLine;
                }
            });
            return invoice;
        });
        
        //console.log(invoices)

        // clear the invoice table

        invoiceHead.innerHTML = `<tr></tr>`;
        invoiceBody.innerHTML = "";

        // populate invocies head
        invoiceHead.innerHTML = `
            <tr>
                <td></td>
                <td>Invoice Name</td>
                <td>Paid Date</td>
                <td>Total Amount</td>
            </tr>  
        `;


        // populate invoices
        let invoiceTable = "";
        let count = 0;
    
        for (let row of invoices) {
            for (let cell of row.invoiceLines) {
                if (row.InvoiceId === cell.InvoiceId) {
                    invoiceTable += `
                        <tr>
                            <td><input type="radio" id="btn" name="selected" value="select"></td>
                            <td>${row.Name}</td>
                            <td>${row.PaidDate}</td>
                            <td>${count += cell.total}</td>
                        </tr>
                    `;
                }
                break
            }
        }
        
        // console.log(invoices)
        // let list = document.querySelector(".list");
        
        // let radioBtn = document.getElementsByName("selected");
        // console.log(radioBtn)
        
        // for (let i = 0; i < radioBtn.length; i++) {
        //     radioBtn[i].onclick = function() {
        //         for(let item of invoices) {
        //             for (let names of item) {
        //                 if (radioBtn[i].checked) {
        //                     if (item.InvoiceId === names.InvoiceId) {
        //                         list.innerHTML += `<li>${names.name}</li>`;
        //                     }
        //                 }
        //             }
        //             break
        //         }
        //     };
        // }

        // radio buttoneri het djvarutyun arajacav
        

        // Clear the the invocies lines
        tableHead.innerHTML = `<tr></tr>`;
        tableBody.innerHTML = "";

        //Populate the invoiceslines head
        let dataHtml = "";

        tableHead.innerHTML = `
            <tr>
                <td>Product</td>
                <td>Price Per unit</td>
                <td>Quantity</td>
                <td>Total Amount</td>
            </tr>
        `;

        //Populate invoicelines
        
        for (const row of invoices) {
            for (const product of row.invoiceLines) {
                if (row.InvoiceId === product.InvoiceId) {
                    dataHtml += `
                        <tr>
                            <td>${product.name}</td>
                            <td>${product.price}</td>
                            <td>${product.Quantity}</td>
                            <td>${product.total}</td>
                        </tr>
                    `;
                }  
            } 
            break
        }

        invoiceBody.innerHTML = invoiceTable;
        tableBody.innerHTML = dataHtml;
        //document.body.append(list)
    } catch (error) {
       console.log(error)
   }
}

getData(url, document.querySelector(".content-table"));









