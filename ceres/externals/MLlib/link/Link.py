from typing import Any

class Link(object):
    def __init__(self, input: Any, output:Any) -> None:
        super().__init__()

        assert type(input) == type(output)
    
