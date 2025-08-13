
// what about cyclic links
function deepClone(value) {
    if (Array.isArray(value)) {
        return value.slice().map(deepClone)
    } else if (typeof value === 'object' && value !== null) {
        if (value.constructor.name == "Object") {
            return Object.fromEntries(
                Object.entries(value).map(([key,keyValue]) => [key, deepClone(keyValue)])
            )
        // can clone known object types: Set, Map, ?Date
        } else {
            throw new Error("Not defined cloning for object " + value.constructor.name)
        }
    } else {
        return value
    }
}