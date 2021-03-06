# See https://docs.julialang.org/en/v1/manual/interfaces/#man-interface-array-1
using Revise, BinaryTraits

import Base: size, getindex, setindex!

# -----------------------------------------------------------------------------
# AbstractArray interface
# -----------------------------------------------------------------------------

@trait Dimension prefix Has,No
@implement HasDimension by size()::Tuple

# Bottom is used due to duck typing of the value `v` below
const Bottom = Base.Bottom

@trait LinearIndexing prefix Has,No
@implement HasLinearIndexing by getindex(i::Int)
@implement HasLinearIndexing by setindex!(v::Bottom, i::Int)

const IntVarArg = Vararg{Int, N} where N

@trait CartesianIndexing prefix Has,No
@implement HasCartesianIndexing by getindex(I::IntVarArg)
@implement HasCartesianIndexing by setindex!(v::Bottom, I::IntVarArg)

# -----------------------------------------------------------------------------
# Example: 1-D Int array
# -----------------------------------------------------------------------------
const Array1DInt = Array{Int,1}

@assign Array1DInt with HasDimension
@check(Array1DInt)
#=
julia> @check(Array1DInt)
✅ Array{Int64,1} has implemented:
1. DimensionTrait: HasDimension ⇢ size(::<Type>)::Tuple
=#

@assign Array1DInt with HasLinearIndexing
@check(Array1DInt)
#=
julia> @check(Array1DInt)
✅ Array{Int64,1} has implemented:
1. LinearIndexingTrait: HasLinearIndexing ⇢ getindex(::<Type>, ::Int64)::Any
2. LinearIndexingTrait: HasLinearIndexing ⇢ setindex!(::<Type>, ::Union{}, ::Int64)::Any
3. DimensionTrait: HasDimension ⇢ size(::<Type>)::Tuple
=#

# 1D array is a specialized version of CartesianIndexing.
# Let's verify.
@assign Array1DInt with HasCartesianIndexing
@check(Array1DInt)
#=
julia> @check(Array1DInt)
✅ Array{Int64,1} has implemented:
1. LinearIndexingTrait: HasLinearIndexing ⇢ getindex(::<Type>, ::Int64)::Any
2. LinearIndexingTrait: HasLinearIndexing ⇢ setindex!(::<Type>, ::Union{}, ::Int64)::Any
3. CartesianIndexingTrait: HasCartesianIndexing ⇢ getindex(::<Type>, ::Vararg{Int64,N} where N)::Any
4. CartesianIndexingTrait: HasCartesianIndexing ⇢ setindex!(::<Type>, ::Union{}, ::Vararg{Int64,N} where N)::Any
5. DimensionTrait: HasDimension ⇢ size(::<Type>)::Tuple
=#

# -----------------------------------------------------------------------------
# Example: SquaresVector
# -----------------------------------------------------------------------------

struct SquaresVector <: AbstractArray{Int, 1}
    count::Int
end

Base.size(S::SquaresVector) = (S.count,)
Base.getindex(S::SquaresVector, i::Int) = i*i

@assign SquaresVector with HasDimension,HasLinearIndexing
@check(SquaresVector)
#=
julia> @check(SquaresVector)
✅ SquaresVector has implemented:
1. LinearIndexingTrait: HasLinearIndexing ⇢ getindex(::<Type>, ::Int64)::Any
2. LinearIndexingTrait: HasLinearIndexing ⇢ setindex!(::<Type>, ::Union{}, ::Int64)::Any
3. DimensionTrait: HasDimension ⇢ size(::<Type>)::Tuple
=#
