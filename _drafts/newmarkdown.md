## Disable/Bypass Windows 8 Automatic Repair

### Question

    On my windows 8 pro machine windows keeps wanting to run the
    automatic repair upon boot. It always fails and I know as a matter
    of fact that there is nothing wrong with it. How can you disable,
    bypass, or permanently remove this "feature"?

### Awswer

    As Robert has just mentioned, you can fix that by disabling the
    Automatic Repair feature right in Boot Configuration Database, here
    is how:

    1\. Press WindowsKey and type 'cmd' (without quotes), then hit Enter
    holding Ctrl+Shift pressed.

    2\. Confirm elevation for the Command Prompt application.

    3\. At the elevated command prompt type the following and hit Enter when
    you are done:

    ``` {.prettyprint}
    bcdedit /set {current} recoveryenabled No
    ```

    This command will modify the boot entry that has been used to boot
    your current Windows 8 configuration and turn off Automatic Repair
    feature for this boot entry.

    Now that when booting Windows 8, you will always have Automatic
    Repair disabled.

    Or,

    you can craft a separate boot entry that will have the Automatic
    Repair turned off.

    1\. At the elevated command prompt type:

    ``` {.prettyprint}
    bcdedit /copy {default} /d "No Automatic Repair"
    ```

    This command will copy the default Windows installation entry used
    to boot Windows automatically. Typically this is your current
    Windows installation, however, if you have multiple Windows
    installations and want to modify currently booted Windows which is
    NOT the Windows installation booted by defeault, use this command:

    ``` {.prettyprint}
    bcdedit /copy {current} /d "No Automatic Repair"
    ```

     NOTE: Everything that goes in quotes after the /d switch would be a
    text used to name the newly created boot entry, the one you'll see
    in the boot menu after the POST screen.

    Now write down the GUID returned by either of the
    two bcdedit commands.

    2\. Configure the newly created boot entry and modify its recoveryenabled
    option:

    ``` {.prettyprint}
    bcdedit /set {GUID_YOUVE_MEMORIZED_OR_WROTE_DOWN} recoveryenabled No
    ```

    Specify the GUID string returned by the bcdedit command above
    instead of the {GUID\_YOUVE\_MEMORIZED\_OR\_WROTE\_DOWN} placeholder
    like:

    ``` {.prettyprint}
    bcdedit /set {de686ca2-e0c7-437e-b8d9-618bc5aad674} recoveryenabled No
    ```

    WARNING: if you ever wanted to turn Automatic Repair on in the
    future, just use the following command:

    ``` {.prettyprint}
    bcdedit /set {de686ca2-e0c7-437e-b8d9-618bc5aad674} recoveryenabled Yes
    ```

    3\. List the Boot Configuration Database to display all the available
    boot entries, the ones you'll see when you boot your PC next time by
    typing:

    ``` {.prettyprint}
    C:\Windows\system32>bcdedit /enum /v
    ```

    Locate the recoveryenabled option under the Windows Boot Loader list
    for the boot entry with the identifier option set to the GUID on
    your newly created boot entry (the
    {de686ca2-e0c7-437e-b8d9-618bc5aad674} one in the example above).

    You will have a display like (this is just an example, your output
    will have different GUIDs):

    ``` {.prettyprint}
    C:\Windows\system32>bcdedit /enum /v

    Windows Boot Manager
    --------------------
    identifier              {9dea862c-5cdd-4e70-acc1-f32b344d4795}
    device                  partition=\Device\HarddiskVolume2
    path                    \EFI\Microsoft\Boot\bootmgfw.efi
    description             Windows Boot Manager
    locale                  en-US
    inherit                 {7ea2e1ac-2e61-4728-aaa3-896d9d0a9f0e}
    default                 {94254878-b1c9-11e1-bd5c-beae0a39fe08}
    resumeobject            {94254877-b1c9-11e1-bd5c-beae0a39fe08}
    displayorder            {94254878-b1c9-11e1-bd5c-beae0a39fe08}
                            {94254874-b1c9-11e1-bd5c-beae0a39fe08}
                            {9425487c-b1c9-11e1-bd5c-beae0a39fe08}
    toolsdisplayorder       {b2721d73-1db4-4c62-bf78-c548a880142d}
    timeout                 30

    Windows Boot Loader
    -------------------
    identifier              {94254878-b1c9-11e1-bd5c-beae0a39fe08}
    device                  vhd=[D:]\win8rtm.vhdx,locate=custom:12000002
    path                    \Windows\system32\winload.efi
    description             Windows 8
    locale                  en-US
    inherit                 {6efb52bf-1766-41db-a6b3-0ee5eff72bd7}
    recoverysequence        {94254879-b1c9-11e1-bd5c-beae0a39fe08}
    recoveryenabled         Yes
    isolatedcontext         Yes
    allowedinmemorysettings 0x15000075
    osdevice                vhd=[D:]\win8rtm.vhdx,locate=custom:22000002
    systemroot              \Windows
    resumeobject            {94254877-b1c9-11e1-bd5c-beae0a39fe08}
    nx                      OptIn
    bootmenupolicy          Standard
    hypervisorlaunchtype    Auto

    Windows Boot Loader
    -------------------
    identifier              {94254874-b1c9-11e1-bd5c-beae0a39fe08}
    device                  vhd=[D:]\win8rtm.vhd,locate=custom:12000002
    path                    \Windows\system32\winload.efi
    description             No Automatic Repair 
    locale                  en-US
    inherit                 {6efb52bf-1766-41db-a6b3-0ee5eff72bd7}
    recoverysequence        {94254875-b1c9-11e1-bd5c-beae0a39fe08}
    recoveryenabled         No
    isolatedcontext         Yes
    allowedinmemorysettings 0x15000075
    osdevice                vhd=[D:]\win8rp.vhd,locate=custom:22000002
    systemroot              \Windows
    resumeobject            {94254873-b1c9-11e1-bd5c-beae0a39fe08}
    nx                      OptIn
    bootmenupolicy          Standard
    hypervisorlaunchtype    Auto
    ```

    Please ask for assistance if you need any.\

    ------------------------------------------------------------------------

Source: [https://social.technet.microsoft.com/Forums/windows/en-US/df2eed2a-67e2-498e-ae6b-42d171ccacd3/disablebypass-windows-8-automatic-repair?forum=w8itprogeneral]()
