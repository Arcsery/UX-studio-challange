package app.challenge.contacts.contact

import app.challenge.contacts.contact.dto.ContactRequest
import app.challenge.contacts.contact.dto.ContactResponse
import org.springframework.http.HttpStatus
import org.springframework.stereotype.Service
import org.springframework.web.server.ResponseStatusException

@Service
class ContactService(
    private val repo: ContactRepository
) {

    fun getAll(): List<ContactResponse> =
        repo.findAll().map { it.toResponse() }

    fun getOne(id: Long): ContactResponse =
        repo.findById(id).orElseThrow {
            ResponseStatusException(HttpStatus.NOT_FOUND, "Contact not found")
        }.toResponse()

    fun create(req: ContactRequest): ContactResponse {
        val contact = Contact(
            name = req.name,
            email = req.email,
            phone = req.phone,
            imageUrl = req.imageUrl
        )
        return repo.save(contact).toResponse()
    }

    fun update(id: Long, req: ContactRequest): ContactResponse {
        val contact = repo.findById(id).orElseThrow {
            ResponseStatusException(HttpStatus.NOT_FOUND, "Contact not found")
        }

        contact.name = req.name
        contact.email = req.email
        contact.phone = req.phone
        contact.imageUrl = req.imageUrl

        return repo.save(contact).toResponse()
    }

    fun delete(id: Long) {
        if (!repo.existsById(id)) {
            throw ResponseStatusException(HttpStatus.NOT_FOUND, "Contact not found")
        }
        repo.deleteById(id)
    }
}

fun Contact.toResponse() = ContactResponse(
    id = this.id,
    name = this.name,
    email = this.email,
    phone = this.phone,
    imageUrl = this.imageUrl
)