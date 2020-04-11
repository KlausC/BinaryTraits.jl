module BinaryTraits

using MacroTools

export @trait, @assign
export @implement, @check
export istrait

export InterfaceReview

include("misc.jl")
include("utils.jl")
include("trait.jl")
include("interface.jl")

end # module