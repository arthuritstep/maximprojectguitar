import json

from django.http import HttpResponse

from .models import Guitar
from .serializers import GuitarSerializer


serializer = GuitarSerializer()


def response_json(data, status=200):
    return HttpResponse(json.dumps(data), status=status, content_type="application/json")


def health(request):
    return response_json({"status": "ok", "service": "guitar-shop-api"})


def guitar_list(request):
    if request.method == "POST":
        try:
            if request.content_type == "application/json":
                data = json.loads(request.body.decode("utf-8"))
            else:
                data = request.POST
        except (TypeError, ValueError):
            return response_json({"error": "bad JSON"}, 400)

        try:
            cleaned = serializer.validate(data)
        except ValueError as error:
            return response_json({"error": str(error)}, 400)

        guitar = Guitar.objects.create(**cleaned)
        return response_json(serializer.serialize(guitar), 201)

    guitars = Guitar.objects.all()
    return response_json(serializer.serialize_list(guitars))


def guitar_detail(request, pk):
    try:
        guitar = Guitar.objects.get(pk=pk)
    except Guitar.DoesNotExist:
        return response_json({"error": "Guitar not found"}, 404)

    if request.method == "GET":
        return response_json(serializer.serialize(guitar))

    if request.method == "DELETE":
        guitar.delete()
        return response_json({"message": "Guitar deleted"})

    if request.method in {"PUT", "PATCH"}:
        try:
            if request.content_type == "application/json":
                data = json.loads(request.body.decode("utf-8"))
            else:
                data = request.POST
        except (TypeError, ValueError):
            return response_json({"error": "bad JSON"}, 400)

        try:
            cleaned = serializer.validate({**serializer.serialize(guitar), **data})
        except ValueError as error:
            return response_json({"error": str(error)}, 400)

        for key, value in cleaned.items():
            setattr(guitar, key, value)
        guitar.save()
        return response_json(serializer.serialize(guitar))

    return response_json({"error": "Method not allowed"}, 405)
