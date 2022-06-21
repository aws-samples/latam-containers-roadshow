export function stringToBool(b: string) {
    // convert string "true" => true and "false" => false
    switch (b) {
        case "true": return true
        case "false": return false
        default: return false
    }
}