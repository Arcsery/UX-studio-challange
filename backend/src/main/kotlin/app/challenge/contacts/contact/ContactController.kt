package app.challenge.contacts.contact

import app.challenge.contacts.contact.dto.ContactRequest
import app.challenge.contacts.contact.dto.ContactResponse
import app.challenge.contacts.files.FileStorageService
import jakarta.validation.Valid
import org.springframework.http.HttpStatus
import org.springframework.web.bind.annotation.CrossOrigin
import org.springframework.web.bind.annotation.DeleteMapping
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.PutMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RequestParam
import org.springframework.web.bind.annotation.ResponseStatus
import org.springframework.web.bind.annotation.RestController
import org.springframework.web.multipart.MultipartFile
import org.springframework.web.server.ResponseStatusException

@RestController
@CrossOrigin(origins = ["http://localhost:4200"])
@RequestMapping("/api/contacts")
class ContactController(
    private val service: ContactService,
    private val fileStorageService: FileStorageService
) {

    @GetMapping
    fun getAll(): List<ContactResponse> =
        service.getAll()

    @GetMapping("/{id}")
    fun getOne(@PathVariable id: Long): ContactResponse =
        service.getOne(id)

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    fun create(@RequestBody @Valid req: ContactRequest): ContactResponse =
        service.create(req)

    @PutMapping("/{id}")
    fun update(
        @PathVariable id: Long,
        @RequestBody @Valid req: ContactRequest
    ): ContactResponse =
        service.update(id, req)

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    fun delete(@PathVariable id: Long) {
        service.delete(id)
    }

    @PostMapping("/{id}/image")
    fun uploadImage(
        @PathVariable id: Long,
        @RequestParam("file") file: MultipartFile
    ): ContactResponse {
        if (file.isEmpty) {
            throw ResponseStatusException(HttpStatus.BAD_REQUEST, "Empty file")
        }

        val imageUrl = fileStorageService.store(file)
        return service.updateImage(id, imageUrl)
    }
}