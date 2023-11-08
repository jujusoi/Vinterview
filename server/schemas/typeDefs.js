const typeDefs = `
    type Profile {
        _id: ID!,
        email: String!,
        password: String!,
        firstName: String,
        lastName: String,
        orgName: String,
        age: Int,
        userLocation: String!,
        experience: String,
        biography: String!,
        industry: String!,
        profilePicture: String,
        isOrganisation: Boolean!,
    }
    
    type Listing {
        _id: ID!,
        title: String!,
        organisationName: String!,
        industry: String!,
        salary: String!,
        jobType: String!,
        jobDescription: String!,
        postedOn: String!,
        posterId: ID!,
    }

    input CreateProfile {
        email: String!,
        password: String!,
        firstName: String,
        lastName: String,
        age: Int,
        userLocation: String!,
        experience: String,
        biography: String!,
        industry: String!,
        profilePicture: String,
        isOrganisation: Boolean!,
    }

    input CreateOrganisation {
        email: String!,
        password: String!,
        orgName: String,
        userLocation: String!,
        biography: String!,
        industry: String!,
        profilePicture: String,
        isOrganisation: Boolean!,
    }

    input CreateListing {
        title: String!,
        organisationName: String!,
        industry: String!,
        salary: String!,
        jobType: String!,
        jobDescription: String!,
        postedOn: String!,
        posterId: ID!,
    }

    type Query {
        profiles: [Profile]
        profilesByOrg(isOrganisation: Boolean!): Profile
        listings: [Listing]
    }

    type Mutation {
        createProfile(profileInfo: CreateProfile!): Profile
        createOrg(profileInfo: CreateOrganisation!): Profile
        createListing(listingInfo: CreateListing!): Listing
    }
`

module.exports = typeDefs;