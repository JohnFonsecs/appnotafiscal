export function Tax(taxCode: string, invoiceValue: number, state: string) {
    let tax = 0
  
    if ((taxCode == '1234' || taxCode =='6789') && state == "RJ") {
      tax = invoiceValue * 0.01
    } else if ((taxCode == '1234' || taxCode =='6789') && state == "SP") {
        tax = invoiceValue * 0.02
    } else if ((taxCode == '1234' || taxCode =='6789') && state == "MG") {
        tax = invoiceValue * 0.03
    }
  
    return tax
  }

  export function Total(taxValue: number, invoiceValue: number) {
    let total = 0
  
    total = invoiceValue + taxValue
  
    return total
  }