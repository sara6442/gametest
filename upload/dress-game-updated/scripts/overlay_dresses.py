"""
overlay_dresses.py — Create composite images showing each dress overlaid on the body
to visualize the alignment issues.
"""

from PIL import Image

body = Image.open('/home/z/my-project/public/body.png').convert('RGBA')
dresses = ['dress2', 'dress3', 'dress4']

for dress_name in dresses:
    dress = Image.open(f'/home/z/my-project/public/{dress_name}.png').convert('RGBA')
    # Overlay dress on body with 60% opacity on the dress
    dress_semi = dress.copy()
    # Make a semi-transparent version of the dress
    alpha = dress_semi.split()[3]
    alpha = alpha.point(lambda p: int(p * 0.7))
    dress_semi.putalpha(alpha)
    
    composite = body.copy()
    composite.paste(dress_semi, (0, 0), dress_semi)
    
    # Save to download folder
    composite.save(f'/home/z/my-project/download/overlay-{dress_name}.png')
    print(f'Saved overlay-{dress_name}.png')

print('Done')
