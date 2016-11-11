# Bilious

Part of the [TF2Stadium](https://github.com/TF2Stadium) project. It is
a backend API server to gradually take over some
of [Helen](https://github.com/TF2Stadium/Helen)'s duties, and also
support future features.

## Setup

    git clone https://github.com/TF2Stadium/Bilious.git
    cd Bilious
    npm install
    cp .env .env.local
    # edit .env.local with your postgres DB settings
    npm start

Note: Currently relies on being pointed at a database configured for
it via [Helen](https://github.com/TF2Stadium/Helen)

## License

Copyright © 2016 TF2Stadium Contributors

Source code released under the
[GPLv3 License (GPLv3)](https://github.com/TF2Stadium/Frontend/blob/master/LICENSE).
