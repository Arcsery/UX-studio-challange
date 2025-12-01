package app.challenge.contacts.contact

import app.challenge.contacts.contact.dto.ContactRequest
import app.challenge.contacts.contact.dto.ContactResponse
import app.challenge.contacts.files.FileStorageService
import org.springframework.http.HttpStatus
import org.springframework.stereotype.Service
import org.springframework.web.server.ResponseStatusException

@Service
class ContactService(
    private val repo: ContactRepository,
    private val fileStorageService: FileStorageService
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

    fun updateImage(id: Long, imageUrl: String): ContactResponse {
        val contact = repo.findById(id).orElseThrow {
            ResponseStatusException(HttpStatus.NOT_FOUND, "Contact not found")
        }

        contact.imageUrl?.let { oldUrl ->
            fileStorageService.delete(oldUrl)
        }

        contact.imageUrl = imageUrl
        return repo.save(contact).toResponse()
    }

    fun delete(id: Long) {
        val contact = repo.findById(id).orElseThrow {
            ResponseStatusException(HttpStatus.NOT_FOUND, "Contact not found")
        }

        contact.imageUrl?.let { oldUrl ->
            fileStorageService.delete(oldUrl)
        }

        repo.delete(contact)
    }
}

fun Contact.toResponse() = ContactResponse(
    id = this.id,
    name = this.name,
    email = this.email,
    phone = this.phone,
    imageUrl = this.imageUrl
)