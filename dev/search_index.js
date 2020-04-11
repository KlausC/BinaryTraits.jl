var documenterSearchIndex = {"docs":
[{"location":"guide/#User-Guide-1","page":"User Guide","title":"User Guide","text":"","category":"section"},{"location":"guide/#Traits-1","page":"User Guide","title":"Traits","text":"","category":"section"},{"location":"guide/#The-@trait-macro-1","page":"User Guide","title":"The @trait macro","text":"","category":"section"},{"location":"guide/#","page":"User Guide","title":"User Guide","text":"The syntax of @trait macro is as follows:","category":"page"},{"location":"guide/#","page":"User Guide","title":"User Guide","text":"@trait T [as <category>] [prefix <positive>,<negative>] [with <trait1>,<trait2>,...]","category":"page"},{"location":"guide/#","page":"User Guide","title":"User Guide","text":"<positive> and <negative> are words that indicates whether a data type exhibits the trait.\n<trait1>, <trait2>, etc. are used to define composite traits.","category":"page"},{"location":"guide/#Using-custom-super-type-1","page":"User Guide","title":"Using custom super-type","text":"","category":"section"},{"location":"guide/#","page":"User Guide","title":"User Guide","text":"The as-clause is used to specify the super-type of the trait type. If the clause is missing, the super-type is defaulted to Any.","category":"page"},{"location":"guide/#","page":"User Guide","title":"User Guide","text":"This may be useful when you want to group a set of traits under the same \"umbrella\".","category":"page"},{"location":"guide/#Specifying-custom-Prefixes-1","page":"User Guide","title":"Specifying custom Prefixes","text":"","category":"section"},{"location":"guide/#","page":"User Guide","title":"User Guide","text":"When you define a trait using verbs like Fly or Swim in the above, it makes sense to define trait types with Can and Cannot prefixes.  But, what if you want to define a trait using a noun or an adjective?","category":"page"},{"location":"guide/#","page":"User Guide","title":"User Guide","text":"In that case, you can define your trait with the prefix clause.  For example:","category":"page"},{"location":"guide/#","page":"User Guide","title":"User Guide","text":"@trait Iterable prefix Is,Not","category":"page"},{"location":"guide/#","page":"User Guide","title":"User Guide","text":"In that case, the following types will be defined instead:","category":"page"},{"location":"guide/#","page":"User Guide","title":"User Guide","text":"IsIterable\nNotIterable","category":"page"},{"location":"guide/#","page":"User Guide","title":"User Guide","text":"This should make your code a lot more readable.","category":"page"},{"location":"guide/#Making-composite-traits-1","page":"User Guide","title":"Making composite traits","text":"","category":"section"},{"location":"guide/#","page":"User Guide","title":"User Guide","text":"Sometimes we really want to compose traits and use it directly for dispatch.  In that case, we just need to use the with clause:","category":"page"},{"location":"guide/#","page":"User Guide","title":"User Guide","text":"@trait Fly\n@trait Swim\n@trait FlySwim with Fly,Swim","category":"page"},{"location":"guide/#","page":"User Guide","title":"User Guide","text":"Then, we can just dispatch as follows:","category":"page"},{"location":"guide/#","page":"User Guide","title":"User Guide","text":"spank(x) = spank(flyswimtrait(x), x)\nspank(::CanFlySwim, x) = \"Flying high and diving deep\"\nspank(::CannotFlySwim, x) = \"Too Bad\"","category":"page"},{"location":"guide/#Assigning-traits-1","page":"User Guide","title":"Assigning traits","text":"","category":"section"},{"location":"guide/#","page":"User Guide","title":"User Guide","text":"Once you define your favorite traits, you may assign any data type to these traits.","category":"page"},{"location":"guide/#","page":"User Guide","title":"User Guide","text":"For example:","category":"page"},{"location":"guide/#","page":"User Guide","title":"User Guide","text":"@trait Wheels prefix Has,No\n@trait Engine prefix Has,No\n\nstruct Car end\n@assign Car with Engine,Wheels","category":"page"},{"location":"guide/#Interfaces-1","page":"User Guide","title":"Interfaces","text":"","category":"section"},{"location":"guide/#","page":"User Guide","title":"User Guide","text":"A useful feature of traits is to define formal interfaces.  Currently, Julia does not come with any facility to specify functional interfaces.  The users are expected to look up interface definitions from documentations.","category":"page"},{"location":"guide/#","page":"User Guide","title":"User Guide","text":"This package provides additional machinery to formally define interfaces. It also comes with an interface checker that can be used to verify the validity of data type implementations.","category":"page"},{"location":"guide/#Defining-interfaces-1","page":"User Guide","title":"Defining interfaces","text":"","category":"section"},{"location":"guide/#","page":"User Guide","title":"User Guide","text":"TBD","category":"page"},{"location":"guide/#Implementing-interfaces-1","page":"User Guide","title":"Implementing interfaces","text":"","category":"section"},{"location":"guide/#","page":"User Guide","title":"User Guide","text":"TBD","category":"page"},{"location":"guide/#Verifying-interfaces-1","page":"User Guide","title":"Verifying interfaces","text":"","category":"section"},{"location":"guide/#","page":"User Guide","title":"User Guide","text":"TBD","category":"page"},{"location":"design/#Under-the-hood-1","page":"Under the hood","title":"Under the hood","text":"","category":"section"},{"location":"design/#","page":"Under the hood","title":"Under the hood","text":"The underlying machinery is extremely simple. When you define a traits like @trait Fly as Ability, it literally expands to the following code:","category":"page"},{"location":"design/#","page":"Under the hood","title":"Under the hood","text":"abstract type FlyTrait <: Ability end\nstruct CanFly <: FlyTrait end\nstruct CannotFly <: FlyTrait end\nflytrait(x) = CannotFly()","category":"page"},{"location":"design/#","page":"Under the hood","title":"Under the hood","text":"As you can see, our opinion is to define a new abstract type called  FlyTrait.  Likewise, we define CanFly and CannotFly subtypes.  Finally, we define a default trait function flytrait that just returns an instance of CannotFly.  Hence, all data types are automatically defined from the trait by default.","category":"page"},{"location":"design/#","page":"Under the hood","title":"Under the hood","text":"Now, when you do @assign Duck with Fly,Swim, it is just translated to:","category":"page"},{"location":"design/#","page":"Under the hood","title":"Under the hood","text":"flytrait(::Duck) = CanFly()\nswimtrait(::Duck) = CanSwim()","category":"page"},{"location":"design/#","page":"Under the hood","title":"Under the hood","text":"Making composite traits is slightly more interesting.  It creates a new trait by combining multiple traits together.  Having a composite trait is defined as one that exhibits all of the underlying traits.  Hence, @trait FlySwim as Ability with Fly,Swim would be translated to the following:","category":"page"},{"location":"design/#","page":"Under the hood","title":"Under the hood","text":"abstract type FlySwimTrait <: Ability end\nstruct CanFlySwim <: FlySwimTrait end\nstruct CannotFlySwim <: FlySwimTrait end\n\nfunction flyswimtrait(x)\n    if flytrait(x) === CanFly() && swimtrait(x) === CanSwim()\n        CanFlySwim()\n    else\n        CannotFlySwim()\n    end\nend","category":"page"},{"location":"reference/#Reference-1","page":"Reference","title":"Reference","text":"","category":"section"},{"location":"reference/#Macros-1","page":"Reference","title":"Macros","text":"","category":"section"},{"location":"reference/#","page":"Reference","title":"Reference","text":"@trait\n@assign\n@implement\n@check","category":"page"},{"location":"reference/#BinaryTraits.@trait","page":"Reference","title":"BinaryTraits.@trait","text":"@trait <name> [as <category>] [prefix <positive>,<negative>] [with <trait1,trait2,...>]\n\nCreate a new trait type for name called $(name)Trait:\n\nIf the as clause is provided, then category (an abstract type) will be used as the super type of the trait type.\nIf the prefix clause is provided, then it allows the user to choose different prefixes than the default ones (Can and Cannot) e.g. prefix Is,Not or prefix Has,Not.\nIf the with clause is provided, then it defines a composite trait from existing traits. Note that you must specify at least 2 traits to make a composite trait.\n\n\n\n\n\n","category":"macro"},{"location":"reference/#BinaryTraits.@assign","page":"Reference","title":"BinaryTraits.@assign","text":"@assign <T> with <Trait1, Trait2, ...>\n\nAssign traits to the data type T.  For example:\n\n@assign Duck with Fly,Swim\n\nis translated to something like:\n\nflytrait(::Duck) = CanFly()\nswimtrait(::Duck) = CanSwim()\n\nwhere x is the name of the trait X in all lowercase, and T is the type being assigned with the trait X.\n\n\n\n\n\n","category":"macro"},{"location":"reference/#BinaryTraits.@implement","page":"Reference","title":"BinaryTraits.@implement","text":"@implement <CanType> by <FunctionSignature>\n\nRegister function signature for the specified CanType of a trait. You can use the @check macro to verify your implementation after these interface contracts are registered.  The function signature only needs to specify required arguments other than the object itself.  Also, return type is optional and in that case it will be ignored by the interface checker.\n\nFor examples:\n\n@implement CanFly by fly(direction::Direction, speed::Float64)\n@implement CanFly by has_wings()::Bool\n\nThe data types that exhibit those CanFly traits must implement the function signature with the addition of an object as first argument i.e.\n\nfly(duck::Duck, direction::Direction, speed::Float64)\nhas_wings(duck::Duck)::Bool\n\n\n\n\n\n","category":"macro"},{"location":"reference/#BinaryTraits.@check","page":"Reference","title":"BinaryTraits.@check","text":"@check <T>\n\nCheck whether the data type T fully implements all of its assigned traits.  Return an InterfaceReview object.\n\n\n\n\n\n","category":"macro"},{"location":"reference/#Functions-1","page":"Reference","title":"Functions","text":"","category":"section"},{"location":"reference/#","page":"Reference","title":"Reference","text":"istrait","category":"page"},{"location":"reference/#BinaryTraits.istrait","page":"Reference","title":"BinaryTraits.istrait","text":"istrait(x)\n\nReturn true if x is a trait type e.g. FlyTrait is a trait type when it is defined by a statement like @trait Fly.\n\n\n\n\n\n","category":"function"},{"location":"reference/#Types-1","page":"Reference","title":"Types","text":"","category":"section"},{"location":"reference/#","page":"Reference","title":"Reference","text":"InterfaceReview","category":"page"},{"location":"reference/#BinaryTraits.InterfaceReview","page":"Reference","title":"BinaryTraits.InterfaceReview","text":"InterfaceReview\n\nAn InterfaceReview object contains the validation results of an interface.\n\nFields:\n\ntype: the type being checked\nresult: true if the type fully implements all required contracts\nimplemented: an array of implemented contracts\nmisses: an array of unimplemented contracts\n\n\n\n\n\n","category":"type"},{"location":"#","page":"Motivation","title":"Motivation","text":"Every motivation starts with an example.  In this page, we cover the following tasks:","category":"page"},{"location":"#","page":"Motivation","title":"Motivation","text":"Defining traits\nAssigning data types with traits\nSpecifying an interface for traits\nChecking if a data type fully implements all contracts from its traits","category":"page"},{"location":"#Example:-tickling-a-duck-and-a-dog-1","page":"Motivation","title":"Example: tickling a duck and a dog","text":"","category":"section"},{"location":"#","page":"Motivation","title":"Motivation","text":"Suppose that we are modeling the ability of animals.  So we can define traits as follows:","category":"page"},{"location":"#","page":"Motivation","title":"Motivation","text":"abstract type Ability end\n@trait Swim as Ability\n@trait Fly as Ability","category":"page"},{"location":"#","page":"Motivation","title":"Motivation","text":"Consider the following animal types. We can assign them traits quite easily:","category":"page"},{"location":"#","page":"Motivation","title":"Motivation","text":"struct Dog end\nstruct Duck end\n\n@assign Dog with Swim\n@assign Duck with Swim,Fly","category":"page"},{"location":"#","page":"Motivation","title":"Motivation","text":"Next, how do you dispatch by traits?  You just follow the Holy Trait pattern:","category":"page"},{"location":"#","page":"Motivation","title":"Motivation","text":"tickle(x) = tickle(flytrait(x), swimtrait(x), x)\ntickle(::CanFly, ::CanSwim, x) = \"Flying high and diving deep\"\ntickle(::CanFly, ::CannotSwim, x) = \"Flying away\"\ntickle(::Ability, ::Ability, x) = \"Stuck laughing\"","category":"page"},{"location":"#","page":"Motivation","title":"Motivation","text":"Voila!","category":"page"},{"location":"#","page":"Motivation","title":"Motivation","text":"tickle(Dog())   # \"Stuck laughing\"\ntickle(Duck())  # \"Flying high and diving deep\"","category":"page"},{"location":"#","page":"Motivation","title":"Motivation","text":"What if we want to enforce an interface? e.g. animals that can fly must implement a fly method.  We can define that interface as follows:","category":"page"},{"location":"#","page":"Motivation","title":"Motivation","text":"@implement CanFly by fly(direction::Float64, altitude::Float64)::Nothing","category":"page"},{"location":"#","page":"Motivation","title":"Motivation","text":"Then, to make sure that our implementation is correct, we can use the @check macro as shown below:","category":"page"},{"location":"#","page":"Motivation","title":"Motivation","text":"julia> @check Duck\nInterfaceReview(Duck) missing the following implementations:\n1. CanFly ⇢ fly(::<Type>, ::Float64, ::Float64)::Nothing","category":"page"},{"location":"#","page":"Motivation","title":"Motivation","text":"Now, let's implement the method and check again:","category":"page"},{"location":"#","page":"Motivation","title":"Motivation","text":"julia> fly(duck::Duck, direction::Float64, altitude::Float64) = \"Having fun!\"\n\njulia> @check Duck\nInterfaceReview(Duck) has fully implemented these contracts:\n1. CanFly ⇢ fly(::<Type>, ::Float64, ::Float64)::Nothing","category":"page"}]
}