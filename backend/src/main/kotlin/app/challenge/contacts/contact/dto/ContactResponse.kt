package app.challenge.contacts.contact.dto

data class ContactResponse(
    val id: Long,
    val name: String,
    val email: String,
    val phone: String?,
    val imageUrl: String?
)